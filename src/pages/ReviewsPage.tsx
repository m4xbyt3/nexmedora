/* REPLACE ALL SAMPLE REVIEWS WITH REAL CLIENT REVIEWS BEFORE LAUNCH. Do not publish fabricated reviews. */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Star,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Calendar,
  MapPin,
  Stethoscope,
  ChevronDown
} from 'lucide-react';
import { reviewsData, SHOW_SAMPLE_TAG, DoctorReview } from '../data/reviewsData';

export const ReviewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [visibleCount, setVisibleCount] = useState(4); // 4 at a time pagination

  // Check if all reviews in dataset are sample placeholders
  const areAllReviewsSamples = useMemo(
    () => reviewsData.every((r) => r.isSample),
    []
  );

  // Dynamic statistics calculated directly from dataset
  const totalReviews = reviewsData.length;
  const averageRating = useMemo(() => {
    if (totalReviews === 0) return 0;
    const sum = reviewsData.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / totalReviews).toFixed(1));
  }, [totalReviews]);

  // Rating breakdown counts (5 down to 1)
  const ratingBreakdown = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsData.forEach((r) => {
      if (counts[r.rating] !== undefined) {
        counts[r.rating]++;
      }
    });
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: counts[stars] || 0,
      percentage: totalReviews > 0 ? Math.round(((counts[stars] || 0) / totalReviews) * 100) : 0,
    }));
  }, [totalReviews]);

  // Unique specialties for filter dropdown
  const specialtiesList = useMemo(() => {
    const set = new Set<string>();
    reviewsData.forEach((r) => set.add(r.specialty));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered and sorted reviews
  const filteredReviews = useMemo(() => {
    return reviewsData
      .filter((review) => {
        // Specialty filter
        if (selectedSpecialty !== 'All' && review.specialty !== selectedSpecialty) {
          return false;
        }
        // Rating filter
        if (selectedRating !== 'All' && review.rating !== selectedRating) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = review.doctorName.toLowerCase().includes(q);
          const matchesSpec = review.specialty.toLowerCase().includes(q);
          const matchesText = review.reviewText.toLowerCase().includes(q);
          const matchesLocation = `${review.city || ''} ${review.state || ''}`.toLowerCase().includes(q);
          return matchesName || matchesSpec || matchesText || matchesLocation;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === 'highest') {
          return b.rating - a.rating;
        }
        return 0;
      });
  }, [selectedSpecialty, selectedRating, searchQuery, sortBy]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Helper to extract initials for avatar
  const getInitials = (name: string) => {
    const cleaned = name.replace(/^Dr\.\s*/i, '').replace(/,\s*[A-Z]+$/i, '');
    const parts = cleaned.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return cleaned.slice(0, 2).toUpperCase() || 'DR';
  };

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================== PAGE HEADER & STATS ===================== */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Physician Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
            Client Reviews & Experiences
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Hear directly from healthcare providers across various clinical specialties on their billing performance, clean claim velocity, and daily AR operations.
          </p>

          {/* Conditional Note: Only show when real reviews are active (not placeholder samples) */}
          {!areAllReviewsSamples && (
            <p className="text-xs text-slate-500 italic">
              Reviews are shared by our clients.
            </p>
          )}
        </div>

        {/* ===================== RATING SUMMARY & BREAKDOWN ===================== */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Overall Score */}
            <div className="lg:col-span-4 text-center lg:text-left lg:border-r lg:border-slate-200 lg:pr-8">
              <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-[#0B1F3A] font-heading tracking-tight">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-slate-400 font-semibold text-lg">/ 5.0</span>
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= Math.round(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-200 text-slate-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-slate-600 font-medium">
                Based on <span className="font-bold text-[#0B1F3A]">{totalReviews}</span> verified physician reviews
              </p>
            </div>

            {/* Right: Breakdown Bar Chart */}
            <div className="lg:col-span-8 space-y-2.5">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-14 shrink-0 font-medium text-slate-700">
                    <span>{item.stars}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-3 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  {/* Count & % */}
                  <div className="w-16 text-right font-mono text-slate-500 shrink-0">
                    <span className="font-semibold text-slate-800">{item.count}</span>
                    <span className="text-[11px] text-slate-400 ml-1">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ===================== SEARCH & FILTER CONTROLS ===================== */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-10 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(4);
                }}
                placeholder="Search reviews by doctor or specialty..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
              />
            </div>

            {/* Specialty Filter */}
            <div className="lg:col-span-3">
              <label className="sr-only">Filter by Specialty</label>
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => {
                    setSelectedSpecialty(e.target.value);
                    setVisibleCount(4);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 appearance-none focus:outline-none focus:border-teal-500 focus:bg-white transition cursor-pointer"
                >
                  {specialtiesList.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec === 'All' ? 'All Specialties' : spec}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="lg:col-span-2.5">
              <label className="sr-only">Filter by Rating</label>
              <div className="relative">
                <select
                  value={selectedRating}
                  onChange={(e) => {
                    setSelectedRating(e.target.value === 'All' ? 'All' : Number(e.target.value));
                    setVisibleCount(4);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 appearance-none focus:outline-none focus:border-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="All">All Ratings</option>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="lg:col-span-2.5">
              <label className="sr-only">Sort By</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as 'newest' | 'highest');
                    setVisibleCount(4);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 appearance-none focus:outline-none focus:border-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="highest">Sort: Highest Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* ===================== REVIEWS GRID ===================== */}
        {filteredReviews.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0B1F3A]">No reviews matched</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your specialty or rating filters to see more entries.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('All');
                setSelectedRating('All');
                setVisibleCount(4);
              }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((review, idx) => {
                const initials = getInitials(review.doctorName);

                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: (idx % 4) * 0.08 }}
                    className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative"
                  >
                    <div>
                      {/* Top Header: Avatar, Info, Stars & Sample Tag */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar Initials */}
                          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center font-bold text-sm font-heading shrink-0 shadow-xs">
                            {initials}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A] font-heading">
                                {review.doctorName}
                              </h3>
                              {SHOW_SAMPLE_TAG && review.isSample && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                  Sample review
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-teal-700 font-medium flex items-center gap-1.5 mt-0.5">
                              <Stethoscope className="w-3 h-3 text-teal-600 shrink-0" />
                              <span>{review.specialty}</span>
                            </p>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-slate-200 text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6">
                        "{review.reviewText}"
                      </p>
                    </div>

                    {/* Bottom Metadata: Location & Date */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <div className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>
                          {review.city && review.state
                            ? `${review.city}, ${review.state}`
                            : review.city || review.state || 'United States'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ===================== PAGINATION / LOAD MORE ===================== */}
        {hasMore && (
          <div className="text-center pt-2 pb-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-[#0B1F3A] hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm hover:shadow inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Load More Reviews</span>
              <span className="text-[11px] font-normal text-slate-400">
                ({visibleReviews.length} of {filteredReviews.length})
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
