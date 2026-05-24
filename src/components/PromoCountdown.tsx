import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer, Sparkles, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface PromoCountdownProps {
  onAddToCart: (product: Product) => void;
}

// Target product for the promo
const PROMO_PRODUCT: Product = {
  id: 'dessert-2',
  name: 'Venetian Tiramisu Premium Box',
  category: 'dessert_box',
  price: 68000,
  rating: 5.0,
  reviewsCount: 305,
  image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
  description: 'Menggunakan biskuit ladyfinger premium yang direndam espresso kental arabika dan dilapisi keju mascarpone super lembut khas kota Venesia.',
  isPromo: true,
  originalPrice: 85000
};

export default function PromoCountdown({ onAddToCart }: PromoCountdownProps) {
  // Let's create a rolling countdown target (e.g., 18 hours 45 minutes from now) so it always ticks beautifully
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    // Generate a fixed future timestamp of 18 hours, 42 minutes, 15 seconds from active load time
    const targetTime = Date.now() + (18 * 60 * 60 + 42 * 60 + 15) * 1000;

    const interval = setInterval(() => {
      const diff = targetTime - Date.now();

      if (diff <= 0) {
        // Reset or stop
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="promo" className="py-20 bg-brand-cream/65 dark:bg-zinc-900/60 relative overflow-hidden border-y border-brand-cream-dark/50 dark:border-zinc-800">
      {/* Decorative floral/wheat design elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-brown-light/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Promo Text and Ticking Clock Displays */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900/50 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={11} className="animate-spin text-pink-600" />
              <span>PENAWARAN TERBATAS HARI INI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
              Nikmati Potongan Promo <br />
              Hingga <span className="text-[#D81B60] dark:text-brand-accent">20% OFF</span> Premium Dessert
            </h2>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              Manjakan sore akhir pekan Anda dengan perpaduan espresso Italia asli dan krim keju mascarpone Venetian lumer. Stok hanya dibuat terbatas setiap hari demi menjaga kesegaran bahan baku. Ambil bagianmu sekarang sebelum kehabisan!
            </p>

            {/* Countdown timers blocks */}
            <div className="flex items-center gap-3 sm:gap-4 pt-4">
              {/* Hours block */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-md flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-brand-brown-dark dark:text-brand-cream">
                    {formatNumber(timeLeft.hours)}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-2">Jam</span>
              </div>

              <span className="text-2xl font-bold text-brand-brown/50 dark:text-zinc-600 animate-pulse">:</span>

              {/* Minutes block */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-md flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-brand-brown-dark dark:text-brand-cream">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-2">Menit</span>
              </div>

              <span className="text-2xl font-bold text-brand-brown/50 dark:text-zinc-600 animate-pulse">:</span>

              {/* Seconds block */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-md flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-brand-brown dark:text-brand-accent animate-pulse">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-2">Detik</span>
              </div>
            </div>
          </div>

          {/* Interactive Promo Product Card Side */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800/80 p-5 md:p-6"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5">
                <img
                  src={PROMO_PRODUCT.image}
                  alt={PROMO_PRODUCT.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#D81B60] text-white text-xs font-bold tracking-widest shadow-md">
                  SAVE 20%
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-brand-brown-dark dark:text-brand-cream text-lg leading-tight">
                  {PROMO_PRODUCT.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans line-clamp-2">
                  {PROMO_PRODUCT.description}
                </p>

                <div className="pt-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through font-medium">
                      Rp {PROMO_PRODUCT.originalPrice?.toLocaleString('id-ID')}
                    </span>
                    <span className="text-lg font-extrabold text-brand-brown dark:text-brand-accent">
                      Rp {PROMO_PRODUCT.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(PROMO_PRODUCT)}
                    className="px-5 py-3 rounded-full bg-brand-brown hover:bg-brand-brown-dark dark:bg-brand-brown dark:hover:bg-brand-brown-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    <span>Ambil Sekarang</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
