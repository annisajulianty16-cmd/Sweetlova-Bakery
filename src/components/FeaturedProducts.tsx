import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Heart, ShoppingBag, Eye, HelpCircle } from 'lucide-react';
import { PRODUCTS } from '../data/bakeryData';
import { Product } from '../types';

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

const CATEGORIES = [
  { id: 'all', name: 'Semua Menu' },
  { id: 'donat', name: 'Donat Premium' },
  { id: 'cake', name: 'Cake Ultah' },
  { id: 'cupcake', name: 'Cupcake Cantik' },
  { id: 'croissant', name: 'Croissant' },
  { id: 'cheesecake', name: 'Cheesecake' },
  { id: 'dessert_box', name: 'Dessert Box' }
];

export default function FeaturedProducts({ onAddToCart, onToggleWishlist, wishlist }: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter and search business logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const isWishlisted = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <section id="produk" className="py-20 bg-brand-cream-light dark:bg-zinc-950 relative overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-pink/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-brown-light/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-brand-brown dark:text-brand-accent font-serif tracking-wider uppercase text-sm font-semibold">
            Galeri Kelezatan
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
            Produk Unggulan Terfavorit
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Kemewahan cita rasa sejati yang dibuat oleh chef pastry kelas dunia menggunakan resep autentik eropa dengan kearifan rasa nusantara.
          </p>
        </div>

        {/* Filter and Search Bar Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Categories Tab Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap tracking-wide transition-all duration-300 border ${
                  selectedCategory === cat.id
                    ? 'bg-brand-brown border-brand-brown text-white shadow-md'
                    : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-brand-brown dark:text-gray-300 hover:border-brand-brown/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari kelezatan Anda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pl-11 rounded-full text-xs font-medium border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-brown-dark dark:text-brand-cream placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-brown dark:focus:ring-brand-accent shadow-sm"
            />
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Dynamic Product Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => {
                const wish = isWishlisted(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layoutOnDrag
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Badge / Tag indicator */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                      {product.isPopular && (
                        <span className="bg-brand-brown text-brand-cream-light text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          BESTSELLER
                        </span>
                      )}
                      {product.isPromo && (
                        <span className="bg-[#D81B60] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          PROMO SPESIAL
                        </span>
                      )}
                    </div>

                    {/* Left Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-md bg-white/90 hover:bg-white dark:bg-zinc-800/90 dark:hover:bg-zinc-800 text-gray-400 hover:scale-105 active:scale-95 transition-all outline-none ${
                        wish ? 'text-red-500!' : 'hover:text-red-500'
                      }`}
                      aria-label="Add to Wishlist"
                    >
                      <Heart size={16} fill={wish ? 'currentColor' : 'none'} />
                    </button>

                    {/* Card Cover Visual */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      />
                      {/* Dark overlay showing quick details on hover */}
                      <div className="absolute inset-0 bg-brand-brown-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="p-3 rounded-full bg-white text-zinc-950 hover:bg-brand-cream transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Card Content Section */}
                    <div className="p-5 flex flex-col flex-grow space-y-2">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#D2B48C] dark:text-brand-accent font-sans">
                        {product.category.replace('_', ' ')}
                      </p>
                      
                      <h3 className="font-serif font-semibold text-brand-brown-dark dark:text-brand-cream text-base leading-snug hover:text-brand-brown transition-colors">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="flex items-center text-amber-400">
                          <Star size={13} fill="currentColor" />
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                        <span className="text-gray-400 text-[10px]">({product.reviewsCount} review)</span>
                      </div>

                      {/* Footer Buy Trigger - align bottom */}
                      <div className="pt-4 flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          {product.isPromo && product.originalPrice && (
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 line-through font-medium">
                              Rp {product.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                          <span className="text-sm font-bold text-brand-brown dark:text-brand-accent">
                            Rp {product.price.toLocaleString('id-ID')}
                          </span>
                        </div>

                        {/* Order Now Button */}
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-4 py-2.5 rounded-full bg-brand-brown hover:bg-brand-brown-dark dark:bg-brand-brown dark:hover:bg-brand-brown-dark text-white hover:text-brand-cream-light text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 hover:scale-102 active:scale-98 cursor-pointer"
                        >
                          <ShoppingBag size={13} />
                          <span>Pesan Sekarang</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center max-w-sm mx-auto space-y-3"
            >
              <HelpCircle size={44} className="mx-auto text-gray-300 dark:text-zinc-700" />
              <h3 className="text-lg font-serif font-semibold text-brand-brown-dark dark:text-brand-cream">
                Kelezatan Tidak Ditemukan
              </h3>
              <p className="text-xs text-gray-500">
                Kami tidak dapat menemukan produk '{searchQuery}'. Coba masukkan istilah pencarian lain atau gunakan filter kategori di atas.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Detail Product Modal Dialog Popup */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 shadow-2xl border border-gray-100 dark:border-zinc-800 text-left flex flex-col md:flex-row"
              >
                {/* Modal Cover Image */}
                <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden bg-gray-50">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Modal Detail Content */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    {/* Close triggers */}
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                      title="Tutup"
                    >
                      ✕
                    </button>

                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#D2B48C] dark:text-brand-accent mb-1 flex items-center gap-2">
                      <span>Sweetlova Bakery</span>
                      <span>•</span>
                      <span>{selectedProduct.category.replace('_', ' ')}</span>
                    </p>

                    <h3 className="font-serif font-bold text-brand-brown-dark dark:text-brand-cream text-xl mb-3 leading-snug">
                      {selectedProduct.name}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex items-center text-amber-400">
                        <Star size={13} fill="currentColor" />
                        <Star size={13} fill="currentColor" />
                        <Star size={13} fill="currentColor" />
                        <Star size={13} fill="currentColor" />
                        <Star size={13} fill="currentColor" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{selectedProduct.rating}</span>
                      <span className="text-gray-400 text-[10px]">({selectedProduct.reviewsCount} review pelanggan)</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 leading-relaxed mb-6">
                      {selectedProduct.description} Adonan kami uleni manual secara seksama dari gandum berkualitas dan bahan segar import untuk menjaga rahasia kelezatan istimewa Sweetlova.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-4">
                      {selectedProduct.isPromo && selectedProduct.originalPrice && (
                        <span className="text-[11px] text-gray-400 dark:text-gray-500 line-through">
                          Rp {selectedProduct.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className="text-lg font-bold text-brand-brown dark:text-brand-accent">
                        Rp {selectedProduct.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-grow px-5 py-3 rounded-full bg-brand-brown hover:bg-brand-brown-dark text-white text-xs font-semibold tracking-wide transition-all shadow-md text-center cursor-pointer"
                      >
                        Masukkan Keranjang
                      </button>
                      <button
                        onClick={() => onToggleWishlist(selectedProduct)}
                        className={`p-3 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center cursor-pointer text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-all ${
                          isWishlisted(selectedProduct.id) ? 'bg-red-50 text-red-500!' : ''
                        }`}
                        title="Favorit"
                      >
                        <Heart size={16} fill={isWishlisted(selectedProduct.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
