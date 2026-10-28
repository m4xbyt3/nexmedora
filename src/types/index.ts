export interface ServiceItem {
  id: string;
  slug: string;
  stepNumber?: number;
  title: string;
  shortDesc: string;
  iconName: string;
  statNumber?: string;
  statLabel?: string;
  overview: string;
  keyBenefits?: string[];
  processSteps?: { title: string; desc: string }[];
  metrics?: { label: string; value: string }[];
  faqs?: { q: string; a: string }[];
}

export interface SpecialtyItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  iconName: string;
  cptCodes: string[];
  icdCodes: string[];
  commonChallenges: string[];
  ourSolutions: string[];
  avgDenialReduction: string;
  turnaroundSLA: string;
  detailedOverview: string;
  faqs: { q: string; a: string }[];
}

export interface RCMStep {
  stepNumber: number;
  phaseNumber: number;
  phaseName: string;
  title: string;
  shortTitle: string;
  category: 'Front-End' | 'Mid-Cycle' | 'Back-End';
  description: string;
  result?: string;
  detailedDesc?: string;
  turnaroundTime?: string;
  toolsUsed?: string[];
  deliverables?: string[];
  keyRiskPrevented?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  practice: string;
  location: string;
  specialty: string;
  stats: { label: string; value: string };
  rating: number;
}

export interface DenialResult {
  code: string;
  groupCode: string;
  title: string;
  plainExplanation: string;
  commonCauses: string[];
  recommendedActions: string[];
  payerTip: string;
}
