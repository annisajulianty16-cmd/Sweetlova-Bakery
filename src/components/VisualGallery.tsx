import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES } from '../data/bakeryData';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'Semua Moment' },
  { id: 'process', name: 'Proses Pembuatan' },
  { id: 'products', name: 'Detail Roti' },
  { id: 'details', name: 'Bahan Pilihan' },
  { id: 'interior', name: 'Suasana Toko' }
];

export default function VisualGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = useMemo(() => {
    return GALLERY_IMAGES.filter((img) => activeCategory === 'all' || img.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="galeri" className="py-20 bg-brand-cream-light dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-brand-brown dark:text-brand-accent font-serif tracking-wider uppercase text-xs font-bold">
            Galeri Seni Kuliner
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
            Keindahan di Setiap Detail
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Intip kesibukan dapur artisan kami yang higienis, porsi bahan organik terpilih, dan keasrian suasana etalase kami.
          </p>
        </div>

        {/* Filter bar selector */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-305 border ${
                activeCategory === cat.id
                  ? 'bg-brand-brown border-brand-brown text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 text-brand-brown dark:text-gray-300 hover:border-brand-brown/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Mosaic layout gird */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[3/2] overflow-hidden rounded-3xl bg-neutral-100 border border-gray-100 dark:border-zinc-900 shadow-sm hover:shadow-md cursor-pointer-none"
                onClick={() => setSelectedImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual hovering card info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between items-center w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-350">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-pink font-bold">
                        {img.category.toUpperCase()}
                      </span>
                      <h4 className="font-serif font-bold text-white text-sm sm:text-base leading-tight mt-0.5">
                        {img.title}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-lg">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Light-box slide-out popups */}
        <AnimatePresence>
          {selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl z-10"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white hover:text-brand-pink p-2.5 rounded-full transition-colors font-bold text-xs"
                >
                  ✕
                </button>
                <img
                  src={selectedImage}
                  alt="Full-size"
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[80vh] object-contain rounded-xl"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
