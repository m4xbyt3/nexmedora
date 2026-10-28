/* REPLACE ALL SAMPLE REVIEWS WITH REAL CLIENT REVIEWS BEFORE LAUNCH. Do not publish fabricated reviews. */

import reviewsJson from './reviews.json';

export interface DoctorReview {
  id: string;
  doctorName: string;
  specialty: string;
  city?: string;
  state?: string;
  rating: number; // 1 to 5
  reviewText: string;
  date: string;
  isSample: boolean;
}

// Single constant to control whether the "Sample review" tag is shown
export const SHOW_SAMPLE_TAG = true;

export const reviewsData: DoctorReview[] = reviewsJson as DoctorReview[];
