import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security: Disable Express fingerprinting header
app.disable('x-powered-by');

// Security: Enforce standard HTTP protection headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Security: Limit request body payload size to 100KB to defend against memory exhaustion
app.use(express.json({ limit: '100kb' }));

// ===================== IN-MEMORY RATE LIMITER =====================
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitStores = new Map<string, Map<string, RateLimitRecord>>();

function createRateLimiter(bucketName: string, maxRequests: number, windowMs: number) {
  if (!rateLimitStores.has(bucketName)) {
    rateLimitStores.set(bucketName, new Map());
  }
  const store = rateLimitStores.get(bucketName)!;

  // Periodic cleanup every 5 minutes to release stale memory
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
      if (record.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, 300000).unref();

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : req.ip || req.socket.remoteAddress || '127.0.0.1';
    const clientKey = String(ip);
    const now = Date.now();

    let record = store.get(clientKey);
    if (!record) {
      record = { timestamps: [] };
      store.set(clientKey, record);
    }

    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

    if (record.timestamps.length >= maxRequests) {
      const oldest = record.timestamps[0];
      const retryAfterSeconds = Math.ceil((oldest + windowMs - now) / 1000);
      res.setHeader('Retry-After', String(Math.max(1, retryAfterSeconds)));
      return res.status(429).json({
        error: 'Too many requests. Please slow down and try again later.'
      });
    }

    record.timestamps.push(now);
    next();
  };
}

// 30 requests per 15 minutes per IP for AI endpoints
const aiRateLimiter = createRateLimiter('ai-endpoints', 30, 15 * 60 * 1000);
// 10 contact / audit submissions per 15 minutes per IP
const contactRateLimiter = createRateLimiter('contact-form', 10, 15 * 60 * 1000);

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback knowledge base for common denials in case of offline or missing key
const KNOWN_DENIALS: Record<string, {
  title: string;
  groupCode: string;
  plainExplanation: string;
  commonCauses: string[];
  recommendedActions: string[];
  payerTip: string;
}> = {
  'CO-45': {
    title: 'Charge Exceeds Fee Schedule / Maximum Allowable Amount',
    groupCode: 'CO (Contractual Obligation)',
    plainExplanation: 'This is a contractual write-off where the billed amount exceeds the agreed-upon negotiated fee schedule between your provider and the payer.',
    commonCauses: [
      'Normal contractual adjustment per in-network agreement',
      'Incorrect fee schedule applied by clearinghouse or biller',
      'Non-covered secondary adjustments miscategorized'
    ],
    recommendedActions: [
      'Post as contractual discount (write-off) if provider is participating/in-network.',
      'Do NOT bill the patient for this balance under in-network agreements (balance billing violation).',
      'Audit payer fee schedule against contracted rates if adjustment amount seems abnormally high.'
    ],
    payerTip: 'Standard for CMS Medicare, Medicaid, and commercial HMOs/PPOs. Verify your fee schedule contract annually.'
  },
  'CO-16': {
    title: 'Claim/Service Lacks Information or Has Submission/Billing Errors',
    groupCode: 'CO (Contractual Obligation)',
    plainExplanation: 'The payer cannot process the claim because essential medical records, modifier data, primary EOB, or provider taxonomy details are missing.',
    commonCauses: [
      'Missing primary Explanation of Benefits (EOB) for secondary claims',
      'Missing or invalid NDC (National Drug Code) for administered medications',
      'Missing operative notes or clinical charts for complex surgical procedures',
      'Invalid CLIA number on lab diagnostic charges'
    ],
    recommendedActions: [
      'Review the associated Remark Codes (e.g., M127, N257) on the 835 ERA remittance to pinpoint the exact missing element.',
      'Attach requested medical notes, operative report, or Primary EOB via clearinghouse portal.',
      'Resubmit as a corrected claim (Frequency Code 7 on CMS-1500 or UB-04) within payer timely filing limits.'
    ],
    payerTip: 'Check Remark Code (RARC) carefully. Usually 90-day timely filing window for corrected claims.'
  },
  'CO-97': {
    title: 'Payment Adjusted Because Benefit Has Been Bundled',
    groupCode: 'CO (Contractual Obligation)',
    plainExplanation: 'The submitted procedure code is considered an inclusive or bundled component of a primary service performed on the same date of service (NCCI edits).',
    commonCauses: [
      'National Correct Coding Initiative (NCCI) PTP (Procedure-to-Procedure) edit violation',
      'Missing appropriate unbundling modifier (such as Modifier -59, -X{EPSU}, -25, or -51)',
      'Global surgical package inclusion (pre/post-operative evaluation included in surgical fee)'
    ],
    recommendedActions: [
      'Review clinical documentation: Did the service occur at a separate anatomic site, distinct encounter, or separate lesion?',
      'If clinically distinct and supported by documentation, append appropriate modifier (Modifier -59 or X-modifier) and resubmit.',
      'If not clinically distinct, post as contractual allowance/write-off per CMS NCCI rules.'
    ],
    payerTip: 'Payers aggressively scrutinize Modifier -59. Always substantiate distinct session or anatomical structure in the doctor notes.'
  },
  'PR-1': {
    title: 'Deductible Amount',
    groupCode: 'PR (Patient Responsibility)',
    plainExplanation: 'The claim amount was applied toward the patient annual insurance deductible. The payer processed the claim but paid $0 or a partial amount because the patient has not met their yearly deductible threshold.',
    commonCauses: [
      'Early calendar year claims (January - April) before deductible is met',
      'High Deductible Health Plans (HDHPs) with $3,000 - $7,000 individual deductibles',
      'Family deductibles not yet satisfied'
    ],
    recommendedActions: [
      'Confirm the patient policy status and generate a patient billing statement.',
      'If credit card is on file or patient portal payment plan exists, process the charge.',
      'Offer automated patient portal payment links or monthly installment options to prevent aging AR.'
    ],
    payerTip: 'Implement real-time front-desk eligibility verification with Nexmedora to collect estimated deductibles at check-in.'
  },
  'CO-27': {
    title: 'Expenses Incurred After Coverage Terminated',
    groupCode: 'CO (Contractual Obligation)',
    plainExplanation: 'The patient was not enrolled or insurance policy was terminated on or prior to the date of service rendered.',
    commonCauses: [
      'Patient changed employment or lost insurance coverage prior to visit',
      'Front-desk failed to verify real-time insurance eligibility on date of service',
      'Payer retroactively terminated policy due to non-payment of premiums'
    ],
    recommendedActions: [
      'Contact patient to obtain active primary insurance card for the date of service.',
      'If replacement insurance is found, bill the new payer with proof of timely filing.',
      'If no alternative coverage exists, bill the patient directly as Self-Pay with applicable practice discount.'
    ],
    payerTip: 'Automated 48-hour pre-visit eligibility scrubbing prevents 95% of CO-27 termination denials.'
  },
  'CO-197': {
    title: 'Precertification / Prior Authorization Absent',
    groupCode: 'CO (Contractual Obligation)',
    plainExplanation: 'The payer requires prior authorization (PA) before service execution, but no approved authorization number was attached to the claim.',
    commonCauses: [
      'Advanced imaging (MRI, CT), surgeries, or specialty pharmaceuticals performed without obtaining PA',
      'Authorization obtained for different CPT code or different rendering facility',
      'Prior authorization expired before date of service'
    ],
    recommendedActions: [
      'Check if retro-authorization is allowed by the payer (often within 48 to 72 hours of emergency or urgent service).',
      'Check clinical documentation for urgent/emergent medical necessity that excuses PA requirements.',
      'File an appeal citing medical necessity with full clinical history, peer-to-peer review request, and provider narrative.'
    ],
    payerTip: 'Nexmedora dedicates a specialized Prior Auth team to secure authorizations 72 hours prior to scheduled patient visits.'
  }
};

// API: Denial Code Explainer (Protected with rate limiting and input sanitization)
app.post('/api/explain-denial', aiRateLimiter, async (req, res) => {
  try {
    const rawCode = (req.body?.code || '').trim().toUpperCase();
    if (!rawCode || rawCode.length > 25) {
      return res.status(400).json({ error: 'Please provide a valid denial or remark code (max 25 characters).' });
    }

    // If Gemini is available, use it for rich and dynamic explanation
    if (ai) {
      try {
        const prompt = `Analyze this US medical billing CARC (Claim Adjustment Reason Code) or RARC (Remittance Advice Remark Code): "${rawCode}".
Provide structured JSON with the following fields:
- code: exact code formatted like "CO-45" or "PR-1"
- groupCode: description of the group code (e.g. "CO (Contractual Obligation)" or "PR (Patient Responsibility)" or "OA (Other Adjustment)" or "CR (Correction/Reversal)")
- title: standard official title of the CARC/RARC code
- plainExplanation: 2-3 sentences in simple, professional English explaining what this means to medical practice managers and doctors
- commonCauses: array of 3-4 specific root causes that trigger this denial
- recommendedActions: array of 3-4 concrete actionable steps medical billers should take immediately to resolve, appeal, or post this claim
- payerTip: one insider billing tip regarding commercial payers, Medicare MACs, or Medicaid guidelines for this code`;

        const aiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                code: { type: Type.STRING },
                groupCode: { type: Type.STRING },
                title: { type: Type.STRING },
                plainExplanation: { type: Type.STRING },
                commonCauses: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                recommendedActions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                payerTip: { type: Type.STRING }
              },
              required: ['code', 'groupCode', 'title', 'plainExplanation', 'commonCauses', 'recommendedActions', 'payerTip']
            }
          }
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI generation timeout')), 6000)
        );

        const response: any = await Promise.race([aiPromise, timeoutPromise]);

        if (response && response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, data: parsed });
        }
      } catch (aiErr) {
        console.warn('Gemini generateContent timed out or failed, using knowledge-base fallback');
      }
    }

    // Check fallback
    const matched = KNOWN_DENIALS[rawCode] || KNOWN_DENIALS[rawCode.replace(/\s+/g, '')];
    if (matched) {
      return res.json({
        success: true,
        data: {
          code: rawCode,
          ...matched
        }
      });
    }

    // Generic fallback for any other code
    return res.json({
      success: true,
      data: {
        code: rawCode,
        groupCode: rawCode.startsWith('PR') ? 'PR (Patient Responsibility)' : rawCode.startsWith('CO') ? 'CO (Contractual Obligation)' : 'OA (Other Adjustment)',
        title: `Payer Adjustment/Denial Code ${rawCode}`,
        plainExplanation: `The payer has flagged claim ${rawCode} during electronic adjudication. This indicates that reimbursement was either reduced, reassigned, or withheld pending further documentation or policy review.`,
        commonCauses: [
          'Claim scrubber or clearinghouse validation warning',
          'Payer-specific clinical edit or local coverage determination (LCD/NCD)',
          'Benefit limitation or provider credentialing status issue'
        ],
        recommendedActions: [
          'Inspect the 835 Electronic Remittance Advice (ERA) for paired RARC remark codes.',
          'Verify patient eligibility and benefit limitations through payer web portal (Availity, Change Healthcare, UnitedHealthcare).',
          'Contact payer provider relations or submit a formal redetermination appeal with chart notes.'
        ],
        payerTip: 'Our denial management team at Nexmedora specializes in resolving complex aging accounts and recovering withheld revenue.'
      }
    });
  } catch (error) {
    console.error('Error explaining denial code');
    // Security: Do not expose raw internal error strings in response
    res.status(500).json({
      error: 'Failed to interpret denial code. Please try again or reach out to our team.'
    });
  }
});

// Direct Message / Contact Form Submission endpoint (Protected with rate limiting and lead retention)
app.post('/api/contact', contactRateLimiter, (req, res) => {
  const { name, email, phone, message, practiceName, specialty, monthlyClaims, ehrSystem } = req.body || {};

  // Input validation & sanitization
  if (
    typeof name !== 'string' || !name.trim() || name.length > 100 ||
    typeof email !== 'string' || !email.trim() || email.length > 120 ||
    typeof phone !== 'string' || !phone.trim() || phone.length > 30 ||
    typeof message !== 'string' || !message.trim() || message.length > 2500
  ) {
    return res.status(400).json({ error: 'Please provide valid name, email, phone number, and message.' });
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const leadRecord = {
    refId: `NEX-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    practiceName: typeof practiceName === 'string' ? practiceName.trim().slice(0, 100) : undefined,
    specialty: typeof specialty === 'string' ? specialty.trim().slice(0, 60) : undefined,
    monthlyClaims: typeof monthlyClaims === 'string' ? monthlyClaims.trim().slice(0, 50) : undefined,
    ehrSystem: typeof ehrSystem === 'string' ? ehrSystem.trim().slice(0, 50) : undefined
  };

  // Reliability: Safely persist lead entry to a private directory outside web root
  try {
    const leadsDir = path.join(__dirname, 'leads');
    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir, { recursive: true, mode: 0o700 });
    }
    const leadsFilePath = path.join(leadsDir, 'inquiries.jsonl');
    fs.appendFileSync(leadsFilePath, JSON.stringify(leadRecord) + '\n', { encoding: 'utf8', mode: 0o600 });
    console.log(`[LEAD INGESTION] Stored inquiry ${leadRecord.refId} for ${leadRecord.email}`);
  } catch (err) {
    console.error('Failed to persist lead record to disk:', err);
    // Proceed to return response so user experience is not disrupted
  }

  return res.json({
    success: true,
    message: 'Thank you! Your message has been sent. We will get back to you shortly.',
    refId: leadRecord.refId
  });
});

// Binary & Base64 Logo upload endpoint (Secured with admin authorization and PNG signature verification)
app.post('/api/upload-logo', (req, res) => {
  // Security: Require configured ADMIN_API_KEY for file writes
  const configuredAdminKey = process.env.ADMIN_API_KEY;
  const providedAdminKey = req.headers['x-admin-key'];

  if (!configuredAdminKey || providedAdminKey !== configuredAdminKey) {
    return res.status(401).json({
      error: 'Unauthorized: Administrative key is required to modify assets.'
    });
  }

  try {
    const { base64Data } = req.body || {};
    if (!base64Data || typeof base64Data !== 'string') {
      return res.status(400).json({ error: 'base64Data string field is required.' });
    }

    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    // Security: Maximum file size cap (500KB)
    if (buffer.length > 500 * 1024) {
      return res.status(400).json({ error: 'File size exceeds maximum permitted limit (500KB).' });
    }

    // Security: Validate PNG magic numbers: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
    const isPng =
      buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4E &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0D &&
      buffer[5] === 0x0A &&
      buffer[6] === 0x1A &&
      buffer[7] === 0x0A;

    if (!isPng) {
      return res.status(400).json({ error: 'Invalid file format: Only genuine PNG images are permitted.' });
    }

    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const targetPath = path.join(publicDir, 'nexmedora-logo.png');
    fs.writeFileSync(targetPath, buffer);

    return res.json({
      success: true,
      message: 'Saved nexmedora-logo.png to /public/nexmedora-logo.png',
      size: buffer.length
    });
  } catch (error) {
    console.error('Failed to save logo securely');
    return res.status(500).json({ error: 'Failed to process logo upload.' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    app.use(express.static(path.join(__dirname, 'public')));
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexmedora RCM server running at http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  startServer();
}

export { app, startServer };
export default app;
