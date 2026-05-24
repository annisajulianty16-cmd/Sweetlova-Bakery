import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { CartItem } from '../types';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: ShoppingCartProps) {
  
  // Math business logic for sums
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryTax = subtotal > 150000 ? 0 : (subtotal > 0 ? 15000 : 0); // Free delivery above 150k
  const total = subtotal + deliveryTax;

  // Compile pre-filled WhatsApp Checkout Message
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `Halo *Sweetlova Bakery*! 🌸\nSaya ingin memesan menu lezat berikut ini:\n\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *\t${item.product.name}*\n`;
      message += `   \tJumlah: ${item.quantity}x\n`;
      message += `   \tHarga: Rp ${(item.product.price * item.quantity).toLocaleString('id-ID')}\n\n`;
    });

    message += `-----------------------------\n`;
    message += `Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n`;
    message += `Ongkos Kirim: ${deliveryTax === 0 ? '*GRATIS*' : `Rp ${deliveryTax.toLocaleString('id-ID')}`}\n`;
    message += `*Total Pembayaran: Rp ${total.toLocaleString('id-ID')}*\n\n`;
    message += `Mohon dibantu info ketersediaan stok & rincian pengiriman ya Admin manis. Terima kasih! ✨`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Sidebar Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white dark:bg-zinc-950 shadow-2xl border-l border-gray-100 dark:border-zinc-900 flex flex-col justify-between"
          >
            {/* Header section of cart */}
            <div className="p-5 border-b border-gray-100 dark:border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-brown dark:text-brand-accent">
                <ShoppingBag size={20} />
                <h3 className="font-serif font-bold text-lg text-brand-brown-dark dark:text-brand-cream">
                  Keranjang Belanja
                </h3>
                <span className="text-xs bg-brand-pink/20 text-brand-brown-dark dark:text-brand-pink dark:bg-brand-pink-dark/35 px-2 py-0.5 rounded-full font-bold">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-105 dark:hover:bg-zinc-900 text-gray-400 hover:text-zinc-650 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Contents list */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-2xl border border-gray-50 dark:border-zinc-900 bg-brand-cream-light/60 dark:bg-zinc-900/40 relative group"
                  >
                    {/* Item thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-brown-dark dark:text-brand-cream line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-brand-brown dark:text-brand-accent font-semibold block">
                          Rp {item.product.price.toLocaleString('id-ID')}
                        </span>
                      </div>

                      {/* Quantity editors */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-xs font-bold text-brand-brown dark:text-brand-cream hover:bg-brand-cream outline-none cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-xs font-bold text-brand-brown dark:text-brand-cream hover:bg-brand-cream outline-none cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-gray-350 hover:text-red-500 hover:bg-red-50/50 transition-all cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 pb-12">
                  <ShoppingBag size={48} className="text-gray-200 dark:text-zinc-800" />
                  <h4 className="font-serif font-bold text-sm text-brand-brown-dark dark:text-brand-cream">
                    Keranjang Kosong
                  </h4>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Keranjang belanja Sweetlova Anda masih kosong. Silakan jelajahi menu roti, donat, dan kue premium kami lalu uli pesanan Anda!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-brand-brown hover:bg-brand-brown-dark text-white text-xs font-semibold cursor-pointer"
                  >
                    Mulai Belanja
                  </button>
                </div>
              )}
            </div>

            {/* Footer calculations & checkout actions */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Subtotal Menu</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-350">
                      Rp {subtotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      Ongkos Kirim
                      {deliveryTax === 0 && (
                        <span className="text-[9px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold ml-1.5 px-1.5 py-0.5 rounded-full uppercase">
                          Free Above 150k
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-350">
                      {deliveryTax === 0 ? 'Rp 0' : `Rp ${deliveryTax.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-100 dark:border-zinc-900 flex items-center justify-between text-sm text-brand-brown-dark dark:text-brand-cream">
                    <span className="font-serif font-bold">Total Pembayaran</span>
                    <span className="font-sans font-extrabold text-base text-brand-brown dark:text-brand-accent">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {/* WhatsApp Checkout Button */}
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Send size={14} />
                    <span>Pesan via WhatsApp</span>
                  </button>

                  <button
                    onClick={onClearCart}
                    className="w-full py-2 rounded-full border border-gray-250 dark:border-zinc-800 text-gray-500 hover:text-red-500 hover:border-red-550 dark:text-gray-400 dark:hover:text-red-500 transition-colors text-xs font-semibold cursor-pointer"
                  >
                    Kosongkan Belanjaan
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
