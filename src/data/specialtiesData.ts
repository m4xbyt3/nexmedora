import { SpecialtyItem } from '../types';

export const specialtiesData: SpecialtyItem[] = [
  {
    id: 'cardiology',
    slug: 'cardiology',
    name: 'Cardiology',
    shortDesc: 'Billing support for cardiac procedures, diagnostic testing and interventional services, with careful coding for complex visits and timely payment.',
    iconName: 'HeartPulse',
    cptCodes: [
      '93458 (Left heart cath + coronary angiogram)',
      '93306 (Transthoracic echocardiogram)',
      '93000 (12-lead ECG)',
      '93224 (Holter monitoring)',
      '33208 (Pacemaker insertion)'
    ],
    icdCodes: [
      'I25.10 (Atherosclerotic heart disease)',
      'I48.91 (Unspecified atrial fibrillation)',
      'I50.9 (Heart failure)',
      'I10 (Essential hypertension)'
    ],
    commonChallenges: [
      'Aggressive NCCI bundling edits across catheterization, angiography, and stent placements (e.g. CPT 93451-93461)',
      'Strict prior authorization rules for advanced diagnostic echoes, nuclear stress tests, and cardiac MRIs',
      'Complex modifier application (-26 for professional component, -TC for technical component, -59/-XU for distinct interventions)'
    ],
    ourSolutions: [
      'Sub-specialty certified cardiology coders familiar with coronary anatomy and lesion-specific coding hierarchies',
      'Dedicated prior-authorization specialists securing clearances for SPECT, cardiac PET, and transcatheter procedures',
      'Automated global period and split billing tracking across clinical cath labs and outpatient facilities'
    ],
    avgDenialReduction: '91.2%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Billing support for cardiac procedures, diagnostic testing and interventional services, with careful coding for complex visits and timely payment.',
    faqs: [
      {
        q: 'How do you handle separate professional and technical billing for facility-based procedures?',
        a: 'We verify the place of service and automatically append Modifier -26 for the cardiologist professional interpretation, while coordinating to avoid duplicate billing.'
      },
      {
        q: 'How do you prevent denials on concurrent E/M visits on the day of a cardiac cath?',
        a: 'We audit the clinical documentation for a separately identifiable E/M service and append Modifier -25 with distinct medical necessity.'
      }
    ]
  },
  {
    id: 'dermatology',
    slug: 'dermatology',
    name: 'Dermatology',
    shortDesc: 'Accurate billing for medical and cosmetic dermatology, including procedures, biopsies and skin treatments, with correct CPT and ICD-10 coding.',
    iconName: 'Sparkles',
    cptCodes: [
      '17311 (Mohs surgery, 1st stage)',
      '+17312 (Mohs surgery, each additional stage)',
      '11102 (Tangential biopsy of single lesion)',
      '17000 (Destruction of premalignant lesion, 1st)',
      '12032 (Intermediate wound repair)'
    ],
    icdCodes: [
      'C44.319 (Basal cell carcinoma of skin)',
      'C44.42 (Squamous cell carcinoma)',
      'L40.0 (Psoriasis vulgaris)',
      'L70.0 (Acne vulgaris)'
    ],
    commonChallenges: [
      'Payer scrutiny on Modifier -25 when billing an E/M visit alongside a same-day skin biopsy or cryotherapy',
      'Complex lesion measurement rules (excised diameter plus narrowest margins) and closure type documentation',
      'Frequent denials on high-cost biologic medications without timely prior authorization'
    ],
    ourSolutions: [
      'Mohs-trained coders ensuring stage and tissue block counts correlate directly with pathology mapping',
      'Detailed chart audit verifying clinical independence of E/M visits to defend Modifier -25',
      'Dedicated specialty prior authorization desk for high-cost immunosuppressants and biologics'
    ],
    avgDenialReduction: '92.4%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Accurate billing for medical and cosmetic dermatology, including procedures, biopsies and skin treatments, with correct CPT and ICD-10 coding.',
    faqs: [
      {
        q: 'How do you handle cosmetic vs medically necessary procedures on the same encounter?',
        a: 'We establish clean dual-ledger accounts, separating commercial insurance claims for medical lesions from patient self-pay cosmetic fees.'
      }
    ]
  },
  {
    id: 'psychiatry-and-behavioral-health',
    slug: 'psychiatry-and-behavioral-health',
    name: 'Psychiatry and Behavioral Health',
    shortDesc: 'Billing for therapy sessions, medication management and telehealth visits, handled with attention to documentation and payer rules.',
    iconName: 'Brain',
    cptCodes: [
      '90791 (Psychiatric diagnostic evaluation)',
      '90834 (Psychotherapy, 45 minutes)',
      '90837 (Psychotherapy, 60 minutes)',
      '+90833 (Psychotherapy add-on with E/M, 30 min)',
      '99214 (Medical evaluation and management)'
    ],
    icdCodes: [
      'F32.9 (Major depressive disorder, single episode)',
      'F41.1 (Generalized anxiety disorder)',
      'F90.9 (ADHD, unspecified type)',
      'F10.20 (Alcohol dependence, uncomplicated)'
    ],
    commonChallenges: [
      'Carve-out behavioral health networks operating independently of major medical plans',
      'Payer session limits, rolling authorization units, and strict time-based psychotherapy coding rules',
      'Telehealth modifier confusion across commercial carriers versus state programs'
    ],
    ourSolutions: [
      'Specialized mental health billing team tracking rolling authorization unit balances to prevent unbillable sessions',
      'Expertise in carving-out behavioral plans during front-end eligibility verification',
      'Rigorous telehealth place-of-service and modifier mapping per state and carrier rules'
    ],
    avgDenialReduction: '95.3%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Billing for therapy sessions, medication management and telehealth visits, handled with attention to documentation and payer rules.',
    faqs: [
      {
        q: 'How do you bill psychotherapy add-on code 90833 with medical evaluation and management?',
        a: 'We ensure the clinical note reflects both distinct psychiatric evaluation (E/M 99213/99214) and dedicated face-to-face psychotherapy time (+90833) without overlapping time.'
      }
    ]
  },
  {
    id: 'orthopedics',
    slug: 'orthopedics',
    name: 'Orthopedics',
    shortDesc: 'Billing for surgeries, fracture care and musculoskeletal treatment, with a focus on preventing denials on high-value procedures.',
    iconName: 'Bone',
    cptCodes: [
      '27447 (Total knee arthroplasty)',
      '27130 (Total hip arthroplasty)',
      '29881 (Knee arthroscopy w/ meniscectomy)',
      '22612 (Lumbar arthrodesis)',
      '20610 (Major joint injection)'
    ],
    icdCodes: [
      'M17.11 (Primary osteoarthritis, right knee)',
      'M16.12 (Primary osteoarthritis, left hip)',
      'M54.50 (Low back pain)',
      'S83.241A (Tear of lateral meniscus)'
    ],
    commonChallenges: [
      'Lengthy operative reports with multi-level spinal instrumentation and bone grafting add-on codes',
      'Global surgical periods causing denials for post-operative evaluations or staged procedures',
      'Medical necessity documentation for durable medical equipment (DME) and viscosupplementation'
    ],
    ourSolutions: [
      'Specialized orthopedic coders reviewing operative notes word-by-word to capture all billable secondary procedures',
      'Strict tracking of global surgical periods and compliant utilization of Modifiers -58, -78, and -79',
      'Pre-verification of payer policies for joint injection medications and durable medical equipment'
    ],
    avgDenialReduction: '89.5%',
    turnaroundSLA: '24-48 Hours',
    detailedOverview: 'Billing for surgeries, fracture care and musculoskeletal treatment, with a focus on preventing denials on high-value procedures.',
    faqs: [
      {
        q: 'How do you ensure DME items (braces, crutches, orthotics) are reimbursed?',
        a: 'We verify patient DME benefit limits, obtain signed Certificates of Medical Necessity prior to dispense, and bill with valid HCPCS Level II codes and anatomical modifiers.'
      }
    ]
  },
  {
    id: 'pediatrics',
    slug: 'pediatrics',
    name: 'Pediatrics',
    shortDesc: 'Billing for well-child visits, vaccinations and routine care, with close attention to age-specific coding.',
    iconName: 'Baby',
    cptCodes: [
      '99392 (Preventive medicine visit, 1-4 years)',
      '90471 (Immunization administration, 1 vaccine)',
      '96110 (Developmental screening w/ scoring)',
      '96127 (Brief emotional/behavioral assessment)',
      '99213 (Office visit, established patient)'
    ],
    icdCodes: [
      'Z00.129 (Routine child health check)',
      'Z23 (Encounter for immunization)',
      'H66.90 (Otitis media, unspecified)',
      'J45.909 (Unspecified asthma)'
    ],
    commonChallenges: [
      'Simultaneous billing of preventive well-child visits and acute sick visits on the same encounter',
      'Vaccine counseling codes versus administration codes and state-supplied VFC billing rules',
      'Heavy reliance on state fee schedules with strict EPSDT screening requirements'
    ],
    ourSolutions: [
      'Certified pediatric billing team experienced with dual preventive and problem-oriented documentation',
      'Custom VFC modifier rules ensuring vaccine products and administration fees are billed accurately',
      'EPSDT claim formatting preventing administrative rejections'
    ],
    avgDenialReduction: '96.2%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Billing for well-child visits, vaccinations and routine care, with close attention to age-specific coding.',
    faqs: [
      {
        q: 'Can we bill for developmental screening (96110) during a standard well-child checkup?',
        a: 'Yes. CPT 96110 is separately reimbursable when an objective, validated screening instrument is administered and scored.'
      }
    ]
  },
  {
    id: 'internal-medicine',
    slug: 'internal-medicine',
    name: 'Internal Medicine',
    shortDesc: 'Support for primary care providers managing chronic conditions, preventive care and routine visits.',
    iconName: 'Stethoscope',
    cptCodes: [
      '99214 (Office visit, moderate complexity)',
      '99215 (Office visit, high complexity)',
      '99490 (Chronic care management, 20 min)',
      '99424 (Principal care management)',
      'G0438 (Annual wellness visit, initial)'
    ],
    icdCodes: [
      'E11.9 (Type 2 diabetes mellitus)',
      'I10 (Essential hypertension)',
      'E78.5 (Hyperlipidemia)',
      'N18.30 (Chronic kidney disease, stage 3)'
    ],
    commonChallenges: [
      'Time-based and Medical Decision Making (MDM) documentation thresholds under revised E/M guidelines',
      'Proper logging and time capture for monthly Chronic Care Management (CCM) and RPM encounters',
      'Preventive care versus problem-oriented visit bundling on annual wellness checks'
    ],
    ourSolutions: [
      'Expert E/M auditing ensuring provider documentation aligns with appropriate MDM levels',
      'Dedicated care management tracking reconciling clinical minutes for CCM codes 99490 and 99439',
      'Automated screening for split billing on Annual Wellness Visits with secondary acute care'
    ],
    avgDenialReduction: '93.5%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Support for primary care providers managing chronic conditions, preventive care and routine visits.',
    faqs: [
      {
        q: 'How do you maximize reimbursement for Chronic Care Management (CCM)?',
        a: 'We track cumulative non-face-to-face clinical staff minutes each calendar month and automatically queue 99490/99439 when clinical thresholds are met.'
      }
    ]
  },
  {
    id: 'ophthalmology',
    slug: 'ophthalmology',
    name: 'Ophthalmology',
    shortDesc: 'Billing for eye exams, surgeries and vision services, with proper documentation and coding accuracy.',
    iconName: 'Eye',
    cptCodes: [
      '92014 (Comprehensive eye exam, established)',
      '92004 (Comprehensive eye exam, new patient)',
      '66984 (Cataract surgery with IOL)',
      '67028 (Intravitreal injection)',
      '92134 (Scanning computerized ophthalmic diagnostic imaging - retina)'
    ],
    icdCodes: [
      'H25.13 (Age-related nuclear cataract, bilateral)',
      'H40.1130 (Primary open-angle glaucoma)',
      'H35.31 (Nonexudative age-related macular degeneration)',
      'H04.123 (Dry eye syndrome, bilateral)'
    ],
    commonChallenges: [
      'Distinction between Eye codes (92002-92014) and standard E/M codes (99202-99215) for optimal reimbursement',
      'Strict bilateral modifier rules (-50, -RT, -LT) across medical plans versus vision benefit plans',
      'Prior authorization and step-therapy protocols for premium intraocular lenses and anti-VEGF injections'
    ],
    ourSolutions: [
      'Ophthalmic coding specialists auditing diagnostic elements to select the highest compliant code set',
      'Precise anatomical modifier configuration ensuring zero lateral claim drops',
      'Front-end verification separating vision discount plans from medical insurance coverage'
    ],
    avgDenialReduction: '91.8%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Billing for eye exams, surgeries and vision services, with proper documentation and coding accuracy.',
    faqs: [
      {
        q: 'When should we bill 920xx Eye codes versus 992xx E/M codes?',
        a: 'We evaluate documentation against payer guidelines to determine whether the 920xx code or standard E/M code yields appropriate reimbursement based on medical necessity.'
      }
    ]
  },
  {
    id: 'radiology',
    slug: 'radiology',
    name: 'Radiology',
    shortDesc: 'Billing for imaging services such as X-rays, MRI and CT scans, with correct modifier use and compliance checks.',
    iconName: 'Scan',
    cptCodes: [
      '70450 (CT Head/Brain w/o contrast)',
      '72148 (MRI Lumbar Spine w/o contrast)',
      '77067 (Screening mammography bilateral)',
      '76700 (Complete abdominal ultrasound)',
      '71046 (Chest X-ray 2 views)'
    ],
    icdCodes: [
      'R07.9 (Chest pain, unspecified)',
      'R51.9 (Headache, unspecified)',
      'M54.2 (Cervicalgia)',
      'Z12.31 (Encounter for screening mammogram)'
    ],
    commonChallenges: [
      'High claim volumes requiring rapid, error-free electronic processing within hours of study reading',
      'Complex prior authorization requirements imposed by radiology benefit managers',
      'Distinction between screening vs diagnostic exams requiring exact ICD-10 pairing and modifier accuracy'
    ],
    ourSolutions: [
      'Automated integration with imaging workflows for instant charge extraction upon sign-off',
      'Sub-specialty coders handling vascular studies and selectively catheterized vessels',
      'Front-end screening logic ensuring diagnostic indications are substantiated to prevent claim drops'
    ],
    avgDenialReduction: '93.8%',
    turnaroundSLA: '12-24 Hours',
    detailedOverview: 'Billing for imaging services such as X-rays, MRI and CT scans, with correct modifier use and compliance checks.',
    faqs: [
      {
        q: 'Can you handle split billing between outpatient imaging centers and professional reads?',
        a: 'Yes. We configure automated billing rules applying Modifier -26 for independent physician interpretations and Modifier -TC for technical imaging facility equipment.'
      }
    ]
  },
  {
    id: 'urgent-care',
    slug: 'urgent-care',
    name: 'Urgent Care',
    shortDesc: 'Fast, high-volume billing designed for walk-in visits and quick turnaround.',
    iconName: 'Activity',
    cptCodes: [
      '99203 / 99214 (Office/outpatient visit)',
      'S9088 (Urgent care center service, per visit)',
      '12001 (Simple repair of superficial wounds <= 2.5cm)',
      '99000 (Handling/conveyance of specimen)',
      '96372 (Therapeutic/diagnostic injection)'
    ],
    icdCodes: [
      'J06.9 (Acute upper respiratory infection)',
      'S93.401A (Sprain of unspecified ligament of right ankle)',
      'N39.0 (Urinary tract infection)',
      'J20.9 (Acute bronchitis)'
    ],
    commonChallenges: [
      'High daily patient throughput creating demographic and front-desk insurance entry errors',
      'Payer inconsistency regarding S-codes (S9088) versus standard E/M coding',
      'High self-pay and high-deductible exposure leading to uncollected post-visit balances'
    ],
    ourSolutions: [
      'Real-time automated front-end demographic and eligibility scrubbing completed quickly',
      'Custom payer rule engine that automatically applies S9088 for participating commercial payers',
      'Digital patient SMS text-to-pay workflow driving immediate settlement of post-visit copays'
    ],
    avgDenialReduction: '94.1%',
    turnaroundSLA: '12-24 Hours',
    detailedOverview: 'Fast, high-volume billing designed for walk-in visits and quick turnaround.',
    faqs: [
      {
        q: 'Can you handle Occupational Medicine and Workers’ Compensation encounters?',
        a: 'Yes. We maintain dedicated workflows for employer billing, physicals, and specialized state Workers’ Comp forms with agreed fee schedules.'
      }
    ]
  },
  {
    id: 'physical-therapy',
    slug: 'physical-therapy',
    name: 'Physical Therapy',
    shortDesc: 'Billing for rehabilitation and therapy services, including timed codes, visit limits and authorization tracking.',
    iconName: 'Activity',
    cptCodes: [
      '97110 (Therapeutic exercises, each 15 min)',
      '97140 (Manual therapy techniques, each 15 min)',
      '97112 (Neuromuscular re-education, each 15 min)',
      '97116 (Gait training therapy, each 15 min)',
      '97161 / 97162 (PT evaluation, low / moderate complexity)'
    ],
    icdCodes: [
      'M54.5 (Low back pain)',
      'M25.561 (Pain in right knee)',
      'M75.101 (Unspecified rotator cuff tear of right shoulder)',
      'R26.2 (Difficulty in walking)'
    ],
    commonChallenges: [
      'Medicare 8-minute rule calculations and unit rounding across multiple timed codes',
      'Payer visit caps, annual benefit limits, and mandatory KX modifier thresholds',
      'Documentation audits requiring objective functional outcome measure scores'
    ],
    ourSolutions: [
      'Automated 8-minute rule logic tool verifying total treatment time matches billed units',
      'Proactive authorization tracking alerting your team before visit caps are reached',
      'Accurate application of Modifier -59 or -XU when billing manual therapy with other procedures'
    ],
    avgDenialReduction: '94.5%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Billing for rehabilitation and therapy services, including timed codes, visit limits and authorization tracking.',
    faqs: [
      {
        q: 'How do you prevent denials under the Medicare 8-minute rule?',
        a: 'Our software automatically aggregates timed minutes per encounter and ensures billed units adhere to CMS rounding thresholds.'
      }
    ]
  },
  {
    id: 'neurology',
    slug: 'neurology',
    name: 'Neurology',
    shortDesc: 'Billing for neurological consultations, diagnostic testing and procedures, with careful coding for complex cases.',
    iconName: 'Zap',
    cptCodes: [
      '95816 (Electroencephalogram - EEG)',
      '95886 (Needle electromyography - EMG)',
      '95910 (Nerve conduction studies, 7-8 studies)',
      '99215 (High-complexity neurological evaluation)',
      '95718 (Long-term continuous video-EEG recording)'
    ],
    icdCodes: [
      'G40.909 (Epilepsy, unspecified)',
      'G43.909 (Migraine, unspecified)',
      'G20 (Parkinson’s disease)',
      'G35 (Multiple sclerosis)'
    ],
    commonChallenges: [
      'Strict LCD documentation criteria for nerve conduction studies and EMG testing',
      'Complex coding for long-term continuous EEG monitoring and video telemetry',
      'Frequent denials on high-complexity E/M visits combined with cognitive testing'
    ],
    ourSolutions: [
      'Certified coders trained in neurological anatomy, electrode placements, and wave diagnostics',
      'Front-end LCD validation confirming medical necessity prior to claims transmission',
      'Pre-service authorization workflows for specialized neurological infusions and testing'
    ],
    avgDenialReduction: '92.9%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Billing for neurological consultations, diagnostic testing and procedures, with careful coding for complex cases.',
    faqs: [
      {
        q: 'How do you bill EMG and nerve conduction studies performed together?',
        a: 'We ensure the appropriate base and add-on codes are matched with specific anatomical nerve counts to prevent unbundling rejections.'
      }
    ]
  },
  {
    id: 'chiropractic',
    slug: 'chiropractic',
    name: 'Chiropractic',
    shortDesc: 'Billing for spinal adjustments and related treatments, with attention to documentation, medical necessity and payer limits.',
    iconName: 'Stethoscope',
    cptCodes: [
      '98940 (Chiropractic manipulative treatment, 1-2 regions)',
      '98941 (Chiropractic manipulative treatment, 3-4 regions)',
      '98942 (Chiropractic manipulative treatment, 5 regions)',
      '97110 (Therapeutic exercises, each 15 min)',
      '97014 (Electric stimulation therapy)'
    ],
    icdCodes: [
      'M99.01 (Segmental and somatic dysfunction of cervical region)',
      'M99.03 (Segmental and somatic dysfunction of lumbar region)',
      'M54.5 (Low back pain)',
      'G44.209 (Tension-type headache)'
    ],
    commonChallenges: [
      'Medicare Part B CMT limitations requiring specific AT modifier for active treatment and PART documentation',
      'Aggressive bundling of manual therapy (97140) with spinal manipulation (98940/98941)',
      'Payer visit caps (typically 12-20 visits annually) and mandatory proof of functional improvement'
    ],
    ourSolutions: [
      'Automated tracking of Medicare AT modifier and subluxation diagnosis pairing',
      'Compliant use of Modifier -59 with distinct anatomic region documentation',
      'Careful tracking of payer benefit caps and pre-authorization requirements'
    ],
    avgDenialReduction: '93.1%',
    turnaroundSLA: '24 Hours',
    detailedOverview: 'Billing for spinal adjustments and related treatments, with attention to documentation, medical necessity and payer limits.',
    faqs: [
      {
        q: 'How do you handle Medicare Part B chiropractic claims?',
        a: 'We ensure primary subluxation ICD-10 codes, secondary neuromusculoskeletal codes, date of initial treatment, and the mandatory -AT modifier are configured accurately.'
      }
    ]
  }
];
