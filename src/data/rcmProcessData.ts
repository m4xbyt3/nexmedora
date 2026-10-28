import { RCMStep } from '../types';

export interface RCMPhase {
  phaseNumber: number;
  title: string;
  tagline: string;
  steps: RCMStep[];
}

export const rcmProcessSteps: RCMStep[] = [
  // ===================== PHASE 1: FRONT-END =====================
  {
    stepNumber: 1,
    phaseNumber: 1,
    phaseName: 'PHASE 1: Front-End (Before the Visit)',
    title: 'Provider Credentialing & Enrollment',
    shortTitle: 'Credentialing',
    category: 'Front-End',
    description: 'Payer enrollment, CAQH profile management, and re-credentialing for Medicare (PECOS), Medicaid, and commercial panels (BCBS, UHC, Aetna, Cigna, Humana), with automated quarterly CAQH maintenance.',
    result: '100% CAQH compliance, 35-45 days faster enrollment',
    toolsUsed: ['CAQH ProView', 'PECOS', 'NPPES', 'State Medicaid Portals'],
    deliverables: ['Payer provider numbers', 'Active CAQH attestation', 'Contract effective dates'],
    keyRiskPrevented: 'Claims rendered by non-credentialed providers'
  },
  {
    stepNumber: 2,
    phaseNumber: 1,
    phaseName: 'PHASE 1: Front-End (Before the Visit)',
    title: 'Patient Scheduling & Pre-Registration',
    shortTitle: 'Pre-Registration',
    category: 'Front-End',
    description: 'Capture accurate demographics, insurance details, and referral information at the time of booking so that errors don\'t carry downstream.',
    toolsUsed: ['Therabill', 'eClinicalWorks (ECW)', 'Tebra', 'Athenahealth'],
    deliverables: ['Accurate demographic record', 'Active insurance ID images', 'Referral on file'],
    keyRiskPrevented: 'Downstream demographic and policy ID errors'
  },
  {
    stepNumber: 3,
    phaseNumber: 1,
    phaseName: 'PHASE 1: Front-End (Before the Visit)',
    title: 'Eligibility & Benefits Verification',
    shortTitle: 'Eligibility & Benefits',
    category: 'Front-End',
    description: 'Real-time verification 48-72 hours before the visit through carrier portals and IVR/representative calls for complex benefits, with copays collected upfront.',
    result: '95% front-end denial drop',
    toolsUsed: ['Availity Essentials', 'Payer Portals', 'Direct IVR'],
    deliverables: ['Detailed co-pay & deductible sheet', 'Co-insurance breakdown', 'Coverage confirmation'],
    keyRiskPrevented: 'CO-27 (Coverage terminated) & CO-26 errors'
  },
  {
    stepNumber: 4,
    phaseNumber: 1,
    phaseName: 'PHASE 1: Front-End (Before the Visit)',
    title: 'Prior Authorization',
    shortTitle: 'Prior Authorization',
    category: 'Front-End',
    description: 'End-to-end authorization for specialized procedures, advanced imaging, surgeries, and high-cost medications, tracked 5-7 days in advance across CoverMyMeds, Availity, eviCore, Carelon, and AIM.',
    result: '94.6% approval rate',
    toolsUsed: ['CoverMyMeds', 'Availity', 'eviCore', 'Carelon', 'AIM'],
    deliverables: ['Approved authorization number', 'Valid procedure code range', 'Authorized unit count'],
    keyRiskPrevented: 'CO-197 (Precertification/authorization absent)'
  },

  // ===================== PHASE 2: MID-CYCLE =====================
  {
    stepNumber: 5,
    phaseNumber: 2,
    phaseName: 'PHASE 2: Mid-Cycle (Visit to Claim)',
    title: 'Charge Capture',
    shortTitle: 'Charge Capture',
    category: 'Mid-Cycle',
    description: 'Collect superbills and electronic charge slips from providers for every encounter, so no billable service is missed.',
    toolsUsed: ['EHR Charge Capture', 'Digital Superbills', 'Encounter Audits'],
    deliverables: ['100% encounter charge intake', 'Provider sign-off verification', 'Clinical note pairing'],
    keyRiskPrevented: 'Unbilled appointments and missing encounters'
  },
  {
    stepNumber: 6,
    phaseNumber: 2,
    phaseName: 'PHASE 2: Mid-Cycle (Visit to Claim)',
    title: 'Medical Coding',
    shortTitle: 'Medical Coding',
    category: 'Mid-Cycle',
    description: 'AAPC and AHIMA certified coders (4+ years of specialty experience) assign ICD-10-CM/PCS, CPT, and HCPCS codes in line with CMS, ICD-10, and AMA CPT guidelines.',
    result: '99.2% coding accuracy',
    toolsUsed: ['AAPC Coder', 'Optum Encoder', 'NCCI Edit Engine'],
    deliverables: ['Specific ICD-10 coding', 'Exact CPT/HCPCS code assignment', 'Proper modifier application'],
    keyRiskPrevented: 'Coding mismatches and unbundled procedure rejections'
  },
  {
    stepNumber: 7,
    phaseNumber: 2,
    phaseName: 'PHASE 2: Mid-Cycle (Visit to Claim)',
    title: 'Charge Entry',
    shortTitle: 'Charge Entry',
    category: 'Mid-Cycle',
    description: 'Electronic charge entry with automated fee schedules and billing rules, plus daily encounter reconciliation against appointment logs, with a 24-hour turnaround.',
    result: '100% charge reconciliation',
    toolsUsed: ['PM Fee Schedule Engine', 'Batch Entry Tools', 'Daily Reconciliation Logs'],
    deliverables: ['Audited fee schedules applied', 'Line-item charges verified', 'Encounter match confirmed'],
    keyRiskPrevented: 'Missing charges and incorrect fee schedule entries'
  },
  {
    stepNumber: 8,
    phaseNumber: 2,
    phaseName: 'PHASE 2: Mid-Cycle (Visit to Claim)',
    title: 'Claim Scrubbing & Submission (Medical Billing)',
    shortTitle: 'Claim Submission',
    category: 'Mid-Cycle',
    description: 'Claims are scrubbed and filed within 24 hours, managed by dedicated account managers aligned to EST, CST, MST, and PST.',
    result: '98.4% clean claim rate',
    toolsUsed: ['Clearinghouse EDI Gateway', 'Custom Scrubber Engine', 'Payer Direct EDI'],
    deliverables: ['277CA acceptance confirmation', 'Clean electronic claim batch', 'Immediate rejection fixes'],
    keyRiskPrevented: 'Clearinghouse drops and delayed timely filing'
  },

  // ===================== PHASE 3: BACK-END =====================
  {
    stepNumber: 9,
    phaseNumber: 3,
    phaseName: 'PHASE 3: Back-End (After Submission)',
    title: 'Payment Posting & Reconciliation',
    shortTitle: 'Payment Posting',
    category: 'Back-End',
    description: 'ERA and EOB posting within 24 hours against specific charge lines, with secondary claim routing and bank deposit reconciliation.',
    result: 'under 24 hours posting, 100% PM-to-bank agreement',
    toolsUsed: ['835 Auto-Posting', 'Lockbox Reconciliation', 'Bank Deposit Audits'],
    deliverables: ['Line-item payment posting', 'Automatic secondary claim creation', 'Matched bank deposit ledger'],
    keyRiskPrevented: 'Unposted ERAs and mismatched bank ledgers'
  },
  {
    stepNumber: 10,
    phaseNumber: 3,
    phaseName: 'PHASE 3: Back-End (After Submission)',
    title: 'Denial Management & Appeals',
    shortTitle: 'Denial Management',
    category: 'Back-End',
    description: 'Root-cause analysis, rapid resubmission, and clinical appeals, with a strict 48-hour denial turnaround to protect appeal windows.',
    result: '87.4% appeal success rate',
    toolsUsed: ['Denial Tracking System', 'Appeal Letter Generator', 'Payer Escalation Portal'],
    deliverables: ['Root-cause categorical tracking', 'Formal clinical appeals filed', 'Overturned claim receipts'],
    keyRiskPrevented: 'Expired appeal deadlines and uncollected denials'
  },
  {
    stepNumber: 11,
    phaseNumber: 3,
    phaseName: 'PHASE 3: Back-End (After Submission)',
    title: 'Accounts Receivable (AR) Follow-up',
    shortTitle: 'AR Follow-up',
    category: 'Back-End',
    description: 'Tracking and recovery of unpaid claims at 30, 60, 90, and 120+ days, prioritizing high-dollar and timely-filing-sensitive claims.',
    result: 'AR days cut from 45+ to 26.8 (32% reduction)',
    toolsUsed: ['Payer Follow-up Portals', 'Automated Aging Queues', 'Payer Rep Live Calls'],
    deliverables: ['Aging bucket reduction reports', 'Claim status resolution notes', 'Actionable recovery pipeline'],
    keyRiskPrevented: 'Aging write-offs beyond timely filing limits'
  },
  {
    stepNumber: 12,
    phaseNumber: 3,
    phaseName: 'PHASE 3: Back-End (After Submission)',
    title: 'Patient Billing & Statements',
    shortTitle: 'Patient Statements',
    category: 'Back-End',
    description: 'Plain-language statements and omnichannel payment options: SMS Text-to-Pay, email links, and QR-code portal access.',
    toolsUsed: ['Omnichannel Statement Portal', 'SMS Text-to-Pay', 'Digital Payment Gateway'],
    deliverables: ['Clear itemized patient statements', 'Automated SMS/Email links', 'Real-time payment receipt'],
    keyRiskPrevented: 'Patient confusion and delayed self-pay payments'
  },
  {
    stepNumber: 13,
    phaseNumber: 3,
    phaseName: 'PHASE 3: Back-End (After Submission)',
    title: 'Patient Collections',
    shortTitle: 'Patient Collections',
    category: 'Back-End',
    description: 'A friendly support desk and follow-up cadence for self-pay balances.',
    result: '+34% patient cash collected',
    toolsUsed: ['Patient Inbound Helpdesk', 'Structured Balance Cadence', 'Payment Plan Engine'],
    deliverables: ['Patient payment arrangements', 'Compassionate phone inquiry support', 'Increased cash collected'],
    keyRiskPrevented: 'Uncollected patient balances and bad debt transfer'
  },
  {
    stepNumber: 14,
    phaseNumber: 3,
    phaseName: 'PHASE 3: Back-End (After Submission)',
    title: 'Reporting, Analytics & Compliance Review',
    shortTitle: 'Analytics & Compliance',
    category: 'Back-End',
    description: 'Monthly KPI dashboards (clean claim rate, denial rate, AR days, net collection rate) and feedback loops to fix root causes upstream.',
    toolsUsed: ['Executive KPI Dashboard', 'Denial Trend Analysis', 'Compliance Audit Suite'],
    deliverables: ['Executive monthly financial deck', 'Upstream workflow feedback', 'Payer turnaround benchmarks'],
    keyRiskPrevented: 'Recurrent billing inefficiencies and missed revenue trends'
  }
];

export const rcmPhases: RCMPhase[] = [
  {
    phaseNumber: 1,
    title: 'PHASE 1: Front-End',
    tagline: 'Before the Visit',
    steps: rcmProcessSteps.filter((s) => s.phaseNumber === 1)
  },
  {
    phaseNumber: 2,
    title: 'PHASE 2: Mid-Cycle',
    tagline: 'Visit to Claim',
    steps: rcmProcessSteps.filter((s) => s.phaseNumber === 2)
  },
  {
    phaseNumber: 3,
    title: 'PHASE 3: Back-End',
    tagline: 'After Submission',
    steps: rcmProcessSteps.filter((s) => s.phaseNumber === 3)
  }
];
