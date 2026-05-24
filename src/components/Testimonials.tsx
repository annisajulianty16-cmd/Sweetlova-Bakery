import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data/bakeryData';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prevReview = () => {
    setCurrent((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrent((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-brand-cream-light dark:bg-zinc-950 relative overflow-hidden">
      {/* Decorative Blur Vectors */}
      <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-brand-pink/5 blur-3xl" />
      <div className="absolute bottom-1/2 right-10 w-72 h-72 rounded-full bg-brand-brown-light/5 blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="space-y-3 mb-10">
          <span className="text-brand-brown dark:text-brand-accent font-serif tracking-wider uppercase text-xs font-bold">
            Pengalaman Manis Pelanggan
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
            Apa Kata Mereka Tentang Kami?
          </h2>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[300px] sm:min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6 max-w-2xl mx-auto"
            >
              {/* Quote Mark Icon */}
              <Quote size={40} className="mx-auto text-brand-pink/40 dark:text-zinc-700" />

              {/* Comment Text */}
              <blockquote className="text-base sm:text-lg lg:text-xl font-serif italic text-brand-brown-dark/90 dark:text-zinc-200 leading-relaxed font-medium">
                "{REVIEWS[current].comment}"
              </blockquote>

              {/* Rating stars */}
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {Array.from({ length: REVIEWS[current].rating }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>

              {/* Customer Avatar & Bio details */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <img
                  src={REVIEWS[current].avatar}
                  alt={REVIEWS[current].name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-pink/40 shadow-sm"
                />
                <div className="text-left">
                  <cite className="not-italic font-bold font-sans text-sm text-brand-brown-dark dark:text-brand-cream block">
                    {REVIEWS[current].name}
                  </cite>
                  <span className="text-[11px] font-semibold text-gray-400 block font-sans uppercase tracking-wider">
                    {REVIEWS[current].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive slide controllers */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={prevReview}
            className="p-3 rounded-full hover:bg-brand-cream/80 dark:hover:bg-zinc-900 text-brand-brown border border-brand-brown-light/20 shadow-sm transition-all outline-none cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex items-center gap-1.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === i ? 'w-5 bg-brand-brown' : 'w-1.5 bg-brand-brown/30'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            className="p-3 rounded-full hover:bg-brand-cream/80 dark:hover:bg-zinc-900 text-brand-brown border border-brand-brown-light/20 shadow-sm transition-all outline-none cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
