import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'medical-billing',
    slug: 'medical-billing',
    stepNumber: 1,
    title: 'Medical Billing',
    shortDesc: 'Comprehensive full-cycle billing management maximizing insurance collections, scrubbing claims, and reducing aging AR to under 28 days.',
    iconName: 'Receipt',
    statNumber: '98.4%',
    statLabel: 'Clean Claim Rate',
    overview: 'Our full-cycle medical billing services take the heavy administrative burden off your staff. From demographic capture to final payment reconciliation, we deploy dedicated specialty billing teams working around the clock to ensure daily electronic claim submissions with zero backlog.',
    keyBenefits: [
      'Rapid claim turnaround ensuring claims are scrubbed and filed within 24 hours',
      'Dedicated billing account managers aligned with your practice schedule',
      'Direct integration with major clearinghouses (Availity, Change Healthcare, Waystar, Trizetto)',
      'Substantial reduction in cost-to-collect and overhead expenses',
      'Daily tracking of clearinghouse rejections with immediate remediation'
    ],
    processSteps: [
      { title: 'Encounter & Superbill Intake', desc: 'Securely extract charges, clinical notes, and patient demographics directly from your EHR/PM system.' },
      { title: 'Multi-Tier Scrubbing', desc: 'Apply custom billing rules, NCCI edits, LCD/NCD coverage policies, and payer guidelines.' },
      { title: 'Electronic Transmission (EDI 837)', desc: 'Batch and transmit electronic claims to commercial payers, Medicare, and Medicaid.' },
      { title: 'Payment Posting & AR Recovery', desc: 'Post ERAs/EOBs down to the penny and pursue aging claims relentlessly.' }
    ],
    metrics: [
      { label: 'Clean Claim Rate', value: '98.4%' },
      { label: 'Average Days in AR', value: '< 28 Days' },
      { label: 'Collection Increase', value: '+14.2%' },
      { label: 'Turnaround Time', value: '24 Hours' }
    ],
    faqs: [
      { q: 'Can you work inside our existing EHR and Practice Management software?', a: 'Yes. We work directly inside your existing platforms including Therabill, eClinicalWorks, Tebra, Athenahealth, and others with no workflow disruption.' },
      { q: 'How quickly does your team process daily encounters?', a: 'Charges captured in your clinic are audited, scrubbed, and submitted within 24 hours.' }
    ]
  },
  {
    id: 'credentialing-and-compliance',
    slug: 'credentialing-and-compliance',
    stepNumber: 2,
    title: 'Credentialing & Compliance',
    shortDesc: 'End-to-end payer enrollment, CAQH profile management, re-credentialing, and regulatory compliance ensuring zero billing disruptions.',
    iconName: 'Award',
    statNumber: '100%',
    statLabel: 'CAQH Compliance',
    overview: 'Provider credentialing delays cost healthcare practices substantial revenue in unbillable encounters. Nexmedora manages initial commercial payer enrollments, Medicare PECOS revalidations, Medicaid state enrollments, hospital privileges, and automated quarterly CAQH attestations while maintaining strict HIPAA compliance.',
    keyBenefits: [
      'Complete handling of Medicare, Medicaid, and commercial payer panels',
      'Automated quarterly CAQH profile maintenance preventing policy lapses',
      'Direct coordination with payer network managers to expedite effective dates',
      'Strict adherence to HIPAA, HITECH, and industry privacy standards',
      'Detailed credentialing roster matrix accessible with renewal alert tracking'
    ],
    processSteps: [
      { title: 'Provider Document Collection', desc: 'Collect medical licenses, DEA, board certifications, malpractice insurance, and CV.' },
      { title: 'CAQH & PECOS Setup / Update', desc: 'Build or update CAQH ProView profile and submit Medicare and Medicaid enrollments.' },
      { title: 'Payer Application Submission', desc: 'Complete specialty-specific commercial contracting and credentialing applications.' },
      { title: 'Payer Follow-Up & Effective Date Confirmation', desc: 'Regular follow-ups with payer credentialing committees until provider numbers are issued.' }
    ],
    metrics: [
      { label: 'Enrollment Speedup', value: '35-45 Days Faster' },
      { label: 'CAQH Attestation Status', value: '100% On-Time' },
      { label: 'Uncredentialed Denials', value: '0%' },
      { label: 'Payer Panel Success', value: '98%' }
    ],
    faqs: [
      { q: 'How early should we start credentialing a new doctor joining our clinic?', a: 'We recommend initiating provider credentialing 90 to 120 days prior to their first patient encounter to guarantee effective dates align with start dates.' },
      { q: 'Do you offer credentialing as a standalone service?', a: 'Yes! We provide credentialing and compliance as an independent, standalone service for practices that only need help in this specific area.' }
    ]
  },
  {
    id: 'rcm-setup',
    slug: 'rcm-setup',
    stepNumber: 3,
    title: 'RCM Setup',
    shortDesc: 'Complete revenue cycle onboarding, EHR/PM clearinghouse integration, fee schedule mapping, and custom workflow configuration.',
    iconName: 'ShieldCheck',
    statNumber: '7-10 Days',
    statLabel: 'Setup & Onboarding',
    overview: 'Seamlessly transition your revenue cycle management with zero downtime. Our RCM Setup service includes end-to-end clearinghouse configuration, EHR connectivity, custom fee schedule mapping, rules-engine optimization, and front-desk coordination to ensure a smooth, error-free operational launch.',
    keyBenefits: [
      'Rapid 7 to 10 day onboarding with zero disruption to daily clinic encounters',
      'Direct clearinghouse EDI (837/835/270/276) setup and enrollment',
      'Comprehensive fee schedule audit and reimbursement benchmark comparison',
      'Standardized encounter workflows and clinical chart documentation guidelines',
      'Dedicated account manager and secure communication channels'
    ],
    processSteps: [
      { title: 'Practice Assessment & Intake', desc: 'Review current billing workflows, EHR configurations, and active payer contracts.' },
      { title: 'EDI & Clearinghouse Integration', desc: 'Establish secure electronic connections with clearinghouses, payers, and PM systems.' },
      { title: 'Fee Schedule & Rules Calibration', desc: 'Upload custom fee schedules, payer rules, and scrub filters to catch errors upfront.' },
      { title: 'Go-Live & Supervised Processing', desc: 'Launch claims processing under dual-review supervision for the initial billing cycles.' }
    ],
    metrics: [
      { label: 'Average Onboarding Time', value: '7-10 Days' },
      { label: 'Workflow Disruption', value: '0 Hours' },
      { label: 'Clearinghouse Connectivity', value: '100%' },
      { label: 'Initial Submission Clean Rate', value: '98%+' }
    ],
    faqs: [
      { q: 'Will switching our RCM disrupt our ongoing cash flow?', a: 'No. We run a phased onboarding process ensuring current claims continue processing smoothly while the new setup takes effect.' },
      { q: 'Do we need to switch our EHR or billing software?', a: 'Not at all. We integrate directly into whatever software your practice currently uses.' }
    ]
  },
  {
    id: '15-days-free-audit',
    slug: '15-days-free-audit',
    stepNumber: 4,
    title: '15 Days Free Audit',
    shortDesc: 'A comprehensive, line-by-line review of your recent claims, EOBs, and remittance advice to uncover hidden revenue leaks and uncollected dollars.',
    iconName: 'TrendingUp',
    statNumber: '15 Days',
    statLabel: 'Comprehensive Audit',
    overview: 'In just 15 days, our RCM specialist will audit your EOBs line by line and uncover the revenue slipping through your fingers. Know your leaks before they cost you another month. This zero-obligation audit delivers an executive report identifying root-cause denials, uncollected patient balances, undercoded encounters, and actionable recovery recommendations.',
    keyBenefits: [
      'Line-by-line inspection of your recent Explanation of Benefits (EOBs) and ERAs',
      'Root-cause analysis of active denial codes (CARC/RARC) and avoidable write-offs',
      'Benchmark comparison of your clean claim rate and average days in AR',
      'Clear, quantified dollar estimates of recoverable revenue currently locked in aging buckets',
      'Completely free with zero obligation and strictly HIPAA-compliant confidentiality'
    ],
    processSteps: [
      { title: 'Secure Sample Intake', desc: 'Provide a sample of recent billing reports or EOBs under a standard Business Associate Agreement (BAA).' },
      { title: 'Line-by-Line Claim Scrub', desc: 'Our RCM specialists analyze payment adjustments, contractual allowances, and denial reasons.' },
      { title: 'Revenue Leak Quantification', desc: 'Identify systematic patterns causing payment delays, underpayments, or lost reimbursement.' },
      { title: 'Executive Findings Presentation', desc: 'Deliver a clear report with prioritized action steps to immediately reclaim lost revenue.' }
    ],
    metrics: [
      { label: 'Audit Duration', value: '15 Days' },
      { label: 'Cost to Practice', value: '$0 / Free' },
      { label: 'Avg Leaks Identified', value: '12-18%' },
      { label: 'Obligation', value: 'Zero' }
    ],
    faqs: [
      { q: 'Is the 15-day audit really completely free?', a: 'Yes, 100% free with no commitment or credit card required. We provide this audit so healthcare providers can see firsthand where revenue is slipping through their fingers.' },
      { q: 'How do you protect patient privacy during the audit?', a: 'We sign a standard HIPAA Business Associate Agreement (BAA) and all data is handled via 256-bit encrypted channels.' }
    ]
  }
];
