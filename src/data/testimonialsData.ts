/* REPLACE ALL SAMPLE REVIEWS WITH REAL CLIENT REVIEWS BEFORE LAUNCH. Do not publish fabricated reviews. */
import { reviewsData } from './reviewsData';
import { TestimonialItem } from '../types';

export const testimonialsData: TestimonialItem[] = reviewsData.map((r) => ({
  id: r.id,
  quote: r.reviewText,
  author: r.doctorName,
  role: 'Physician',
  practice: r.specialty,
  location: r.city && r.state ? `${r.city}, ${r.state}` : 'United States',
  specialty: r.specialty,
  stats: { label: 'Verified Rating', value: `${r.rating}.0 / 5.0` },
  rating: r.rating
}));
