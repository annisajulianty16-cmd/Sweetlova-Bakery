import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/bakeryData';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 sec automatic rotation
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  return (
    <div id="home" className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-brand-cream-light dark:bg-zinc-950 mt-16">
      {/* Parallax Container / Layered Background Design */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Hero Background Image */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream-light/95 via-brand-cream-light/70 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/60 dark:to-transparent z-10" />
          <img
            src={HERO_SLIDES[current].image}
            alt={HERO_SLIDES[current].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-100 translate-y-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Section - Positioned beautiful typography left-aligned */}
      <div className="absolute inset-0 z-20 flex items-center max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        <div className="w-full lg:w-2/3 xl:w-1/2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-pink/20 dark:bg-brand-pink-dark/30 text-brand-brown dark:text-brand-pink border border-brand-pink/30 hover:bg-brand-pink/30 transition-all text-xs font-semibold tracking-wider uppercase">
                <Sparkles size={13} className="animate-pulse" />
                <span>{HERO_SLIDES[current].tag}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-brand-brown-dark dark:text-brand-cream leading-[1.1] tracking-tight font-semibold">
                {HERO_SLIDES[current].title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-brand-brown dark:text-gray-300 max-w-lg leading-relaxed font-sans">
                {HERO_SLIDES[current].subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#produk"
                  className="px-8 py-3.5 rounded-full bg-brand-brown hover:bg-brand-brown-dark text-brand-cream-light font-medium tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center"
                >
                  Lihat Produk Premium
                </a>
                <a
                  href="#tentang"
                  className="px-8 py-3.5 rounded-full bg-white/85 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-brand-brown-dark dark:text-brand-cream font-medium tracking-wide border border-brand-brown-light/40 shadow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center"
                >
                  Kisah Kami
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Sliding Left/Right Button Controllers */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 hover:bg-white dark:bg-zinc-800/70 dark:hover:bg-zinc-800 text-brand-brown hover:text-brand-brown-dark dark:text-brand-cream border border-brand-brown-light/20 shadow-md hover:scale-105 transition-all outline-none"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 hover:bg-white dark:bg-zinc-800/70 dark:hover:bg-zinc-800 text-brand-brown hover:text-brand-brown-dark dark:text-brand-cream border border-brand-brown-light/20 shadow-md hover:scale-105 transition-all outline-none"
      >
        <ChevronRight size={22} />
      </button>

      {/* Sliding Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === index
                ? 'w-8 bg-brand-brown dark:bg-brand-accent'
                : 'w-2.5 bg-brand-brown/40 dark:bg-zinc-700 hover:bg-brand-brown/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
