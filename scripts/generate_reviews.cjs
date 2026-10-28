const fs = require('fs');

const doctors = [
  { name: "Dr. Marcus Vance, MD", specialty: "Cardiology", city: "Atlanta", state: "GA" },
  { name: "Dr. Sarah Lin, MD", specialty: "Diagnostic Radiology", city: "Chicago", state: "IL" },
  { name: "Dr. Brian K. Miller, MD", specialty: "Urgent Care", city: "Austin", state: "TX" },
  { name: "Dr. Elena Rostova, MD", specialty: "Orthopedic Surgery", city: "Philadelphia", state: "PA" },
  { name: "Dr. Rachel Sterling, MD", specialty: "Behavioral Health", city: "Denver", state: "CO" },
  { name: "Dr. David Patel, MD", specialty: "Internal Medicine", city: "Dallas", state: "TX" },
  { name: "Dr. Lisa Morales, DO", specialty: "Family Medicine", city: "Miami", state: "FL" },
  { name: "Dr. Kenneth Wright, MD", specialty: "Neurology", city: "Phoenix", state: "AZ" },
  { name: "Dr. Amanda Chen, MD", specialty: "Dermatology", city: "San Diego", state: "CA" },
  { name: "Dr. Gregory Brooks, MD", specialty: "Gastroenterology", city: "Seattle", state: "WA" },
  { name: "Dr. Cynthia Taylor, MD", specialty: "Pediatrics", city: "Boston", state: "MA" },
  { name: "Dr. James O'Connor, MD", specialty: "Pulmonology", city: "Nashville", state: "TN" },
  { name: "Dr. Priya Nair, MD", specialty: "Endocrinology", city: "Charlotte", state: "NC" },
  { name: "Dr. Robert Gallagher, DO", specialty: "Pain Management", city: "Indianapolis", state: "IN" },
  { name: "Dr. Hannah Weiss, MD", specialty: "Ophthalmology", city: "Portland", state: "OR" },
  { name: "Dr. Thomas Jensen, MD", specialty: "Rheumatology", city: "Salt Lake City", state: "UT" },
  { name: "Dr. Maria Santos, MD", specialty: "Obstetrics & Gynecology", city: "Tampa", state: "FL" },
  { name: "Dr. Vikram Sethi, MD", specialty: "Nephrology", city: "Columbus", state: "OH" },
  { name: "Dr. Angela Foster, MD", specialty: "Cardiology", city: "Raleigh", state: "NC" },
  { name: "Dr. Kevin Huang, MD", specialty: "Urology", city: "Minneapolis", state: "MN" },
  { name: "Dr. Danielle Ross, DO", specialty: "Family Medicine", city: "Kansas City", state: "MO" },
  { name: "Dr. Eric Zimmerman, MD", specialty: "Orthopedic Surgery", city: "Milwaukee", state: "WI" },
  { name: "Dr. Stephanie Walsh, MD", specialty: "Dermatology", city: "Scottsdale", state: "AZ" },
  { name: "Dr. Nathan Reed, MD", specialty: "Internal Medicine", city: "St. Louis", state: "MO" },
  { name: "Dr. Grace Mitchell, MD", specialty: "Allergy & Immunology", city: "Baltimore", state: "MD" },
  { name: "Dr. Sanjay Gupta, MD", specialty: "Neurology", city: "Cleveland", state: "OH" },
  { name: "Dr. Kimberly Adams, MD", specialty: "Pediatrics", city: "Orlando", state: "FL" },
  { name: "Dr. Matthew Cooper, DO", specialty: "Urgent Care", city: "Las Vegas", state: "NV" },
  { name: "Dr. Laura Bennett, MD", specialty: "Diagnostic Radiology", city: "Sacramento", state: "CA" },
  { name: "Dr. Daniel Hayes, MD", specialty: "Gastroenterology", city: "Pittsburgh", state: "PA" },
  { name: "Dr. Nicole Simmons, MD", specialty: "Behavioral Health", city: "Providence", state: "RI" },
  { name: "Dr. Christopher Lee, MD", specialty: "Cardiology", city: "San Antonio", state: "TX" },
  { name: "Dr. Megan Kelly, MD", specialty: "Pulmonology", city: "Richmond", state: "VA" },
  { name: "Dr. Anthony Russo, MD", specialty: "Pain Management", city: "Hartford", state: "CT" },
  { name: "Dr. Vanessa Diaz, DO", specialty: "Obstetrics & Gynecology", city: "Albuquerque", state: "NM" },
  { name: "Dr. Jeffrey Palmer, MD", specialty: "Orthopedic Surgery", city: "Tucson", state: "AZ" },
  { name: "Dr. Allison Ward, MD", specialty: "Endocrinology", city: "Cincinnati", state: "OH" },
  { name: "Dr. Bradley Hughes, MD", specialty: "Family Medicine", city: "Boise", state: "ID" },
  { name: "Dr. Christine Bailey, MD", specialty: "Dermatology", city: "Charleston", state: "SC" },
  { name: "Dr. Andrew Flores, MD", specialty: "Internal Medicine", city: "Fort Worth", state: "TX" },
  { name: "Dr. Rebecca Stone, MD", specialty: "Nephrology", city: "Louisville", state: "KY" },
  { name: "Dr. Jonathan Kim, MD", specialty: "Diagnostic Radiology", city: "Honolulu", state: "HI" },
  { name: "Dr. Melissa Edwards, DO", specialty: "Urgent Care", city: "Oklahoma City", state: "OK" },
  { name: "Dr. Sean Murphy, MD", specialty: "Rheumatology", city: "Omaha", state: "NE" },
  { name: "Dr. Diana Morris, MD", specialty: "Urology", city: "Memphis", state: "TN" },
  { name: "Dr. Patrick Campbell, MD", specialty: "Allergy & Immunology", city: "Des Moines", state: "IA" },
  { name: "Dr. Courtney Snyder, MD", specialty: "Pediatrics", city: "Jacksonville", state: "FL" },
  { name: "Dr. Tyler Morgan, MD", specialty: "Cardiology", city: "Birmingham", state: "AL" },
  { name: "Dr. Samantha Price, MD", specialty: "Gastroenterology", city: "Grand Rapids", state: "MI" },
  { name: "Dr. Brandon Rivera, DO", specialty: "Family Medicine", city: "Fresno", state: "CA" },
  { name: "Dr. Emily Watson, MD", specialty: "Behavioral Health", city: "Madison", state: "WI" },
  { name: "Dr. Keith Sullivan, MD", specialty: "Orthopedic Surgery", city: "Spokane", state: "WA" }
];

const quotes = [
  "Our days in AR plummeted from 54 days to 26 days within three months. Their overnight certified coding team submits clean claims before our office opens.",
  "We recovered over $210,000 in previously abandoned denials during our first quarter with Nexmedora. Their appeal overturn rate is extraordinary.",
  "Front-desk eligibility verification and scrubbing eliminated our front-end denial bottlenecks. Our first-pass clean claim rate is consistently above 98%.",
  "Processing high exam volumes requires seamless EHR integration. Their team handles charge entry and complex coding with absolute precision.",
  "Prior authorizations and insurance carve-outs used to drain our practice. Nexmedora tracks authorizations meticulously with zero expired-auth denials.",
  "The financial transparency and customized reporting dashboards give me clear visibility into our collections, aging AR, and provider productivity.",
  "Transitioning our billing operations was seamless. The dedicated account manager communicates proactively, and cash flow has never been more predictable.",
  "Their certified CPC coders eliminated bundling errors on procedural claims. Our collections per clinical encounter increased by 14%.",
  "Remarkable professionalism and HIPAA rigor. We no longer worry about biller turnover or training delays impacting our monthly collections.",
  "Appealing complex medical necessity denials used to be neglected due to time constraints. Nexmedora overturned 88% of our carrier denials.",
  "The 24/7 turnaround on superbills has accelerated our payment velocity significantly. Payment posting is reconciled daily with zero discrepancies.",
  "Exceptional service across both commercial payers and Medicaid. Outstanding reduction in claims lingering over 90 days."
];

const dates = [
  "2026-03-24", "2026-03-20", "2026-03-15", "2026-03-11", "2026-03-05", "2026-02-28",
  "2026-02-22", "2026-02-17", "2026-02-12", "2026-02-06", "2026-01-31", "2026-01-25",
  "2026-01-19", "2026-01-14", "2026-01-08", "2026-01-02", "2025-12-27", "2025-12-20",
  "2025-12-14", "2025-12-08", "2025-12-01", "2025-11-25", "2025-11-19", "2025-11-12",
  "2025-11-05", "2025-10-29", "2025-10-22", "2025-10-15", "2025-10-08", "2025-10-01",
  "2025-09-24", "2025-09-18", "2025-09-11", "2025-09-04", "2025-08-28", "2025-08-21",
  "2025-08-14", "2025-08-07", "2025-07-31", "2025-07-24", "2025-07-17", "2025-07-10",
  "2025-07-03", "2025-06-26", "2025-06-19", "2025-06-12", "2025-06-05", "2025-05-29",
  "2025-05-22", "2025-05-15", "2025-05-08", "2025-05-01"
];

const reviews = doctors.map((doc, idx) => {
  // Give 4 stars to a few reviews for realistic distribution (e.g. index 7, 21, 35, 48), rest 5 stars
  const rating = [7, 21, 35, 48].includes(idx) ? 4 : 5;
  const quote = quotes[idx % quotes.length];
  
  return {
    id: `rev-${String(idx + 1).padStart(2, '0')}`,
    doctorName: doc.name,
    specialty: doc.specialty,
    city: doc.city,
    state: doc.state,
    rating: rating,
    reviewText: quote,
    date: dates[idx],
    isSample: true
  };
});

fs.writeFileSync('src/data/reviews.json', JSON.stringify(reviews, null, 2));
console.log('Successfully generated src/data/reviews.json with', reviews.length, 'entries.');
