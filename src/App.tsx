import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  ArrowUp,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  HeartCrack,
  CheckCircle2,
  Trash2
} from 'lucide-react';

// Imports of custom sub-components
import ParticleBackground from './components/ParticleBackground';
import HeroSlider from './components/HeroSlider';
import FeaturedProducts from './components/FeaturedProducts';
import PromoCountdown from './components/PromoCountdown';
import VisualGallery from './components/VisualGallery';
import Testimonials from './components/Testimonials';
import InteractiveFAQ from './components/InteractiveFAQ';
import StoreLocationMap from './components/StoreLocationMap';
import ShoppingCart from './components/ShoppingCart';

import { Product, CartItem } from './types';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sweetlova-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light'; // Default elegant light mode
  });

  // Business Logic States
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sweetlova-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sweetlova-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Drawer controllers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Custom premium notifications state
  const [toast, setToast] = useState<{ id: number; message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync state with local storage
  useEffect(() => {
    localStorage.setItem('sweetlova-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sweetlova-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sweetlova-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Back-to-top sensor trigger
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show customized toasts
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3500);
  };

  // Cart actions handling
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const newCart = [...prevCart];
        newCart[idx].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    triggerToast(`"${product.name}" masuk ke keranjang belanja Anda! ✨`, 'success');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (id: string) => {
    const item = cart.find((i) => i.product.id === id);
    setCart((prevCart) => prevCart.filter((i) => i.product.id !== id));
    if (item) {
      triggerToast(`"${item.product.name}" dihapus dari keranjang.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCart([]);
    triggerToast('Seluruh belanjaan telah dikosongkan.', 'info');
  };

  // Wishlist actions handling
  const handleToggleWishlist = (product: Product) => {
    const isExist = wishlist.some((item) => item.id === product.id);
    if (isExist) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      triggerToast(`"${product.name}" dihapus dari daftar favorit.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      triggerToast(`"${product.name}" disimpan ke daftar favorit! ❤️`, 'success');
    }
  };

  // Contacts Form mock submit logic
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nama = formData.get('nama') as string;
    
    triggerToast(`Terima kasih Kak ${nama}! Pesan Anda telah terkirim. Admin kami akan segera membalas email Anda.`, 'success');
    e.currentTarget.reset();
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-cream-light dark:bg-zinc-950 text-gray-800 dark:text-zinc-100 font-sans transition-all selection:bg-brand-pink select-none overflow-x-hidden relative">
      
      {/* Decorative Particle Background backdrop */}
      <div className="relative">
        <ParticleBackground />
      </div>

      {/* STICKY HEADER & COMPREHENSIVE PREMIUM NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/75 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Name */}
          <a href="#home" className="flex items-center gap-2 group outline-none select-none">
            <span className="font-serif font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-brand-brown-dark via-brand-brown to-brand-accent dark:from-brand-cream dark:via-brand-accent dark:to-brand-pink bg-clip-text text-transparent group-hover:scale-101 transition-transform">
              Sweetlova Bakery
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark dark:text-brand-cream hover:text-brand-accent transition-colors">Beranda</a>
            <a href="#tentang" className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark dark:text-brand-cream hover:text-brand-accent transition-colors">Tentang Kami</a>
            <a href="#produk" className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark dark:text-brand-cream hover:text-brand-accent transition-colors">Produk</a>
            <a href="#promo" className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark dark:text-brand-cream hover:text-brand-accent transition-colors">Promo</a>
            <a href="#galeri" className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark dark:text-brand-cream hover:text-brand-accent transition-colors">Galeri</a>
            <a href="#lokasi" className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark dark:text-brand-cream hover:text-brand-accent transition-colors">Lokasi</a>
            <a href="#kontak" className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark dark:text-brand-cream hover:text-brand-accent transition-colors">Kontak</a>
          </nav>

          {/* Utility Quick Controllers */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Dark Mode toggler */}
            <button
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              className="p-2.5 rounded-full hover:bg-brand-cream dark:hover:bg-zinc-900 text-brand-brown dark:text-brand-pink-light transition-colors outline-none cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 rounded-full hover:bg-brand-cream dark:hover:bg-zinc-900 text-brand-brown dark:text-brand-pink-light relative transition-colors outline-none cursor-pointer"
              aria-label="Open Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-pink text-brand-brown-dark font-mono font-extrabold text-[9px] flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-brand-cream dark:hover:bg-zinc-900 text-brand-brown dark:text-brand-pink-light relative transition-colors outline-none cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag size={18} />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-brown text-white dark:bg-brand-accent dark:text-black font-mono font-extrabold text-[9px] flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full hover:bg-brand-cream dark:hover:bg-zinc-900 text-brand-brown dark:text-brand-cream lg:hidden transition-colors outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE HEADER RESPONSIVE TOGGLED NAV MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-35 bg-white dark:bg-zinc-950 border-b border-gray-150 dark:border-zinc-900 p-6 flex flex-col gap-4 shadow-xl lg:hidden"
          >
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-brown-dark dark:text-brand-cream hover:bg-brand-cream/40"
            >
              Beranda
            </a>
            <a
              href="#tentang"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-brown-dark dark:text-brand-cream hover:bg-brand-cream/40"
            >
              Tentang Kami
            </a>
            <a
              href="#produk"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-brown-dark dark:text-brand-cream hover:bg-brand-cream/40"
            >
              Produk Terlaris
            </a>
            <a
              href="#promo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-brown-dark dark:text-brand-cream hover:bg-brand-cream/40"
            >
              Promo Spesial
            </a>
            <a
              href="#galeri"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-brown-dark dark:text-brand-cream hover:bg-brand-cream/40"
            >
              Galeri Kami
            </a>
            <a
              href="#lokasi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-brown-dark dark:text-brand-cream hover:bg-brand-cream/40"
            >
              Lokasi Toko
            </a>
            <a
              href="#kontak"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-brown-dark dark:text-brand-cream hover:bg-brand-cream/40"
            >
              Hubungi Kami
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* HERO SLIDER SECTION (BERANDA) */}
      <HeroSlider />

      {/* KEY FEATURES BENTO BENCHMARKS (Quick highlights) */}
      <section className="py-12 bg-white dark:bg-zinc-900 border-b border-brand-cream-dark/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex items-start gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream-dark dark:bg-zinc-800 text-brand-brown flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm sm:text-base text-brand-brown-dark dark:text-brand-cream">100% Bahan Organik</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Hanya menggunakan tepung gandum organik, mentega import pilihan, dan buah asli segar tanpa pengawet sintesis.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream-dark dark:bg-zinc-800 text-brand-brown flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm sm:text-base text-brand-brown-dark dark:text-brand-cream">Panggang Segar Tiap Pagi</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tim chef baker ulet kami memulai pemanggangan subuh hari guna menyuguhkan roti krispi terbaik untuk meja makan Anda.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream-dark dark:bg-zinc-800 text-brand-brown flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm sm:text-base text-brand-brown-dark dark:text-brand-cream">Kirim Instan Higienis</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pengemasan mewah berlapis tersegel rapat untuk menjaga higienitas & keindahan pastry sampai di depan pintu rumah Anda.</p>
            </div>
          </div>

        </div>
      </section>

      {/* TENTANG KAMI SECTION */}
      <section id="tentang" className="py-20 bg-brand-cream-light dark:bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Cover layout */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-pink/5 rounded-3xl transform rotate-3 scale-102" />
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
                alt="Adonan Sweetlova Bakery"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl relative z-10 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 z-20 bg-white dark:bg-zinc-900 border border-brand-cream-dark/45 dark:border-zinc-800 p-5 rounded-2xl shadow-lg flex items-center gap-3">
                <span className="font-serif font-extrabold text-3xl text-brand-brown dark:text-brand-accent">8+</span>
                <div className="not-italic text-left leading-tight text-xs font-bold text-gray-500">
                  Tahun Menyajikan <br />
                  <span className="text-brand-brown-dark dark:text-zinc-300">Resep Terbaik</span>
                </div>
              </div>
            </div>

            {/* Text description layout */}
            <div className="space-y-6">
              <span className="text-brand-brown dark:text-brand-accent font-serif tracking-wider uppercase text-xs font-bold">
                Kisah Sweetlova
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
                Kelembutan Rasa yang Diciptakan dengan Cinta Sejati
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Sweetlova Bakery didirikan pada tahun 2018 berawal dari sebuah dapur mungil sederhana di sudut kota Jakarta. Didorong oleh kecintaan mendalam pada keharuman panggangan roti ragi alami, kami mendedikasikan diri untuk meramu resep kue klasik Eropa bertajuk kemewahan cita rasa modern.
              </p>

              <blockquote className="border-l-4 border-brand-pink pl-4 italic text-xs sm:text-sm text-brand-brown font-medium">
                "Kami percaya bahwa sepotong roti bukan sekadar pengganjal lapar, melainkan medium penyalur kebahagiaan dan kehangatan kasih yang merajut kebersamaan keluarga."
              </blockquote>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Setiap donat, cake ulang tahun mewah, cupcake berlapis krim pastel, cheesecake lumer, dan dessert box eksklusif kami uleni sepenuh hati, tanpa bahan pengawet sintesis, tanpa pewarna kimiawi berbahaya. Cicipi kelembutan cita rasa istimewa Sweetlova hari ini.
              </p>

              <div className="pt-2 flex items-center gap-6">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-2xl text-brand-brown-dark dark:text-brand-cream">10k+</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Happy Client</p>
                </div>
                <div className="w-px h-10 bg-brand-cream-dark" />
                <div className="text-center">
                  <h4 className="font-serif font-bold text-2xl text-brand-brown-dark dark:text-brand-cream">120+</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Daily Baked Items</p>
                </div>
                <div className="w-px h-10 bg-brand-cream-dark" />
                <div className="text-center">
                  <h4 className="font-serif font-bold text-2xl text-brand-brown-dark dark:text-brand-cream">4.9</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Average Rating</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCT DISPLAY & FILTERS SECTION */}
      <FeaturedProducts
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlist={wishlist}
      />

      {/* PROMO DISPLAY COUNTDOWN SECTION */}
      <PromoCountdown onAddToCart={handleAddToCart} />

      {/* GALLERY DISPLAY MOSAIC GRID SECTION */}
      <VisualGallery />

      {/* TESTIMONIAL DISPLAY CAROUSEL SECTION */}
      <Testimonials />

      {/* FAQ SECTION */}
      <InteractiveFAQ />

      {/* MAP STORE LOCATION DISPLAY SECTION */}
      <StoreLocationMap />

      {/* CONTACTS FORM & SOCIAL SECTION (KONTAK) */}
      <section id="kontak" className="py-20 bg-white dark:bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Quick contact context - left */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <span className="text-brand-brown dark:text-brand-accent font-serif tracking-wider uppercase text-xs font-bold block">
                Hubungi Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
                Punya Pertanyaan atau Ingin Pesanan Khusus?
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Butuh pesanan hantaran khusus, catering pesta kantor, atau custom wedding cake impian? Chat admin manis kami, kirimkan email, atau isi formulir di samping. Kami gembira mendengar kabar bahagia Anda!
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cream text-brand-brown flex items-center justify-center">
                    <Phone size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">TELEPON DAN WHATSAPP</span>
                    <strong className="text-xs sm:text-sm text-brand-brown-dark dark:text-zinc-200">+62 812-3456-7890</strong>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cream text-brand-brown flex items-center justify-center">
                    <Instagram size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">INSTAGRAM RESMI</span>
                    <strong className="text-xs sm:text-sm text-brand-brown-dark dark:text-zinc-200">@sweetlova.bakery</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Forms - right */}
            <div className="lg:col-span-7 bg-brand-cream/20 dark:bg-zinc-900/40 p-6 sm:p-10 rounded-3xl border border-brand-cream-dark/50 dark:border-zinc-800 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-brand-brown-dark dark:text-brand-cream mb-6">
                Formulir Kontak Layanan
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="nama" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block pb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      id="nama"
                      type="text"
                      name="nama"
                      required
                      placeholder="Kak Budi"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-brown text-brand-brown-dark dark:text-zinc-200 shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block pb-1">
                      Email Komunikasi *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="budi@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-brown text-brand-brown-dark dark:text-zinc-200 shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="topik" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block pb-1">
                    Topik Pertanyaan
                  </label>
                  <select
                    id="topik"
                    name="topik"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-brown text-brand-brown-dark dark:text-zinc-400 shadow-xs"
                  >
                    <option value="pesanan_khusus">Custom / Wedding Cake Terjadwal</option>
                    <option value="kemitraan">Kemitraan Kantor & Event Hampers</option>
                    <option value="keluhan">Saran & Pertanyaan Produk Umum</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="pesan" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block pb-1">
                    Isi Pesan Pertanyaan *
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows={4}
                    required
                    placeholder="Halo Admin, saya berminat pesan paket custom hampers donat isi 24 pcs..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-brown text-brand-brown-dark dark:text-zinc-200 shadow-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-brown hover:bg-brand-brown-dark text-white font-bold text-xs tracking-wider uppercase shadow-md transition-colors cursor-pointer"
                >
                  Kirim Pesan Komunikasi
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP FLOATING BUTTON (Pesan Instan) */}
      <a
        href={`https://wa.me/6281234567890?text=Halo%20Sweetlova%20Bakery!%20🌸%20Saya%20tertarik%20untuk%20tanya%20mengenai%2520roti%20dan%2520kue%2520artisan%2520premium.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] hover:scale-105 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all animate-pulse"
        aria-label="Contact support on WhatsApp"
        title="Hubungi Kami di WhatsApp"
      >
        <Phone size={24} fill="currentColor" />
      </a>

      {/* SLIDE-OUT SHOPPING CART BACKUP DRAWER */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* WISHLIST SIDEBAR DIALOG OVERLAY POPUPS */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs cursor-pointer"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-white dark:bg-zinc-950 p-6 border-l border-gray-150 dark:border-zinc-900 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-900 mb-6">
                  <div className="flex items-center gap-2 text-[#D81B60] dark:text-brand-accent">
                    <Heart size={20} fill="currentColor" />
                    <h3 className="font-serif font-bold text-lg text-brand-brown-dark dark:text-brand-cream">
                      Menu Favorit Saya
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-1 px-2 hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-400 rounded-lg transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2 no-scrollbar">
                  {wishlist.length > 0 ? (
                    wishlist.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-4 p-3 rounded-2xl border border-gray-100 dark:border-zinc-900 bg-pink-50/20 dark:bg-neutral-900/40 relative group"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow text-left">
                          <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-brown-dark dark:text-brand-cream line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-xs text-brand-brown dark:text-brand-accent font-semibold block pt-0.5">
                            Rp {product.price.toLocaleString('id-ID')}
                          </span>
                          
                          <button
                            onClick={() => {
                              handleAddToCart(product);
                              setIsWishlistOpen(false);
                            }}
                            className="text-[10px] text-brand-brown underline hover:text-[#D81B60] font-bold mt-1 inline-block"
                          >
                            Pesan Sekarang
                          </button>
                        </div>

                        {/* Remove favorite button */}
                        <button
                          onClick={() => handleToggleWishlist(product)}
                          className="absolute top-2 right-2 p-1 text-gray-200 group-hover:text-[#D81B60] hover:bg-[#F2D7D9] rounded-lg transition-all cursor-pointer"
                          title="Hapus dari Favorit"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center space-y-2">
                      <HeartCrack size={40} className="mx-auto text-gray-250" />
                      <h4 className="font-serif font-bold text-sm text-brand-brown-dark dark:text-zinc-300">Belum Ada Terpilih</h4>
                      <p className="text-xs text-gray-400">Tekan ikon hati ❤️ di setiap foto menu favoritmu untuk disimpan rapi di sini!</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-4.5 rounded-xl bg-brand-brown hover:bg-brand-brown-dark text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-xs"
              >
                Kembali Belanja
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PREMIUM STICKY SIDE TOAST NOTIFICATION OBSERVER LISTS */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-6 left-6 z-50 max-w-sm w-full shadow-2xl rounded-2xl p-4.5 border text-left glass-panel flex items-start gap-3 border-emerald-50 dark:border-zinc-800"
          >
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5 animate-pulse" size={18} />
            <div className="space-y-0.5">
              <h5 className="font-bold text-xs text-brand-brown-dark dark:text-brand-cream">
                Sweetlova Notifikasi
              </h5>
              <p className="text-xs text-gray-500 dark:text-gray-300 font-medium">
                {toast.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACK TO TOP FLOATING POINTERS */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 bg-brand-brown hover:bg-brand-brown-dark text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Back to Top"
            title="Kembali ke Atas"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* COMPREHENSIVE PREMIUM BRAND FOOTER */}
      <footer className="bg-brand-brown-dark text-brand-cream-light py-16 border-t border-brand-brown/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Col 1 Brand detail */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h3 className="font-serif font-extrabold text-2xl tracking-tight text-white">
              Sweetlova Bakery
            </h3>
            <p className="text-xs text-brand-cream-dark/80 leading-relaxed max-w-sm">
              Seni roti ragi organik terbaik dengan citra kelembutan cinta berpadu rasa kriya panggangan modern khas Sweetlova. Nikmati harmoni rasa premium di setiap gigitan bahagia.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-brand-brown/50 text-white flex items-center justify-center hover:bg-brand-pink hover:text-brand-brown-dark transition-all" aria-label="Follow us on Instagram">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-brown/50 text-white flex items-center justify-center hover:bg-brand-pink hover:text-brand-brown-dark transition-all" aria-label="Follow us on Facebook">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-brown/50 text-white flex items-center justify-center hover:bg-brand-pink hover:text-brand-brown-dark transition-all" aria-label="Follow us on Twitter">
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Col 2 Menu Quicklinks */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-brand-cream-dark/80">
              <li><a href="#home" className="hover:text-brand-pink transition-colors inline-flex items-center gap-1"> <ChevronRight size={10} /> Beranda Utama</a></li>
              <li><a href="#tentang" className="hover:text-brand-pink transition-colors inline-flex items-center gap-1"> <ChevronRight size={10} /> Tentang Kami</a></li>
              <li><a href="#produk" className="hover:text-brand-pink transition-colors inline-flex items-center gap-1"> <ChevronRight size={10} /> Produk Pilihan</a></li>
              <li><a href="#promo" className="hover:text-brand-pink transition-colors inline-flex items-center gap-1"> <ChevronRight size={10} /> Promo Hari Ini</a></li>
              <li><a href="#galeri" className="hover:text-brand-pink transition-colors inline-flex items-center gap-1"> <ChevronRight size={10} /> Galeri Seni</a></li>
            </ul>
          </div>

          {/* Col 3 Opening hours */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              Sajian Istimewa Setiap Hari
            </h4>
            <p className="text-xs text-brand-cream-dark/80 max-w-sm leading-relaxed">
              Tim baker kami memulai pemanggangan adonan di fajar buta demi kelezatan terbaik sarapan Anda. Silakan hubungi nomor kontak kami untuk konsultasi custom wedding cake mewah.
            </p>
            <div className="p-4 rounded-2xl bg-brand-brown/30 space-y-2 max-w-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-brand-cream">
                <span>Senin - Minggu:</span>
                <span>07:00 - 21:00 WIB</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-brand-pink font-semibold">
                <span>Free Delivery Minimum:</span>
                <span>Rp 150.000,-</span>
              </div>
            </div>
          </div>

        </div>

        {/* Separator line & claim rights */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-brown/40 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream-dark/60">
          <p>© {new Date().getFullYear()} Sweetlova Bakery. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#" className="hover:underline">Syarat & Ketentuan</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
