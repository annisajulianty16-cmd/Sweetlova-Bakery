import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/bakeryData';

export default function InteractiveFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-brand-cream/40 dark:bg-zinc-900/45 border-y border-brand-cream-dark/45 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header Title Section */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-brand-brown dark:text-brand-accent font-serif tracking-wider uppercase text-xs font-bold flex items-center justify-center gap-1.5">
            <HelpCircle size={14} className="text-brand-brown" />
            <span>F.A.Q Sweetlova</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Temukan jawaban cepat seputar pemesanan custom, bahan baku premium, durasi ketahanan, dan ketersediaan layanan kurir kami.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-850 shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Trigger Button bar */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4 select-none outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-brand-brown-dark dark:text-brand-cream leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-brand-cream-light dark:bg-zinc-900 text-brand-brown flex items-center justify-center transform transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-brand-pink/20!' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Animated content body collapsible wrapper */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="p-5 pt-0 border-t border-gray-50 dark:border-zinc-900/60 font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
