import { MapPin, Phone, Clock, Compass, ExternalLink } from 'lucide-react';

export default function StoreLocationMap() {
  const address = "Jl. Kemang Raya No. 45, Bangka, Mampang Prapatan, Kota Jakarta Selatan, 12730";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.136015560156!2d106.8129388!3d-6.24584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f167e411b22f%3sKemang%20Raya%20Street!5e0!3m2!1sen!2sid!4v1684345678901!5m2!1sen!2sid";

  return (
    <section id="lokasi" className="py-20 bg-brand-cream/35 dark:bg-zinc-900/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand-brown dark:text-brand-accent font-serif tracking-wider uppercase text-xs font-bold">
            Butik Roti Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown-dark dark:text-brand-cream font-bold leading-tight">
            Kunjungi Sweetlova Bakery
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Nikmati aroma hangat kue panggangan segar kami langsung di lokasi utama yang rimbun dan nyaman di pusat kota Jakarta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Details Section - Left Side */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Address detail */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-pink/20 dark:bg-brand-pink-dark/30 text-brand-brown dark:text-brand-pink flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm text-brand-brown-dark dark:text-brand-cream">
                    Alamat Galeri Kami
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              {/* Working hour detail */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-pink/20 dark:bg-brand-pink-dark/30 text-brand-brown dark:text-brand-pink flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm text-brand-brown-dark dark:text-brand-cream">
                    Jam Operasional
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Senin - Minggu: <strong className="text-brand-brown dark:text-brand-accent">07:00 - 21:00 WIB</strong>
                  </p>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full inline-block">
                    Panggang Segar Setiap Jam 07:00
                  </span>
                </div>
              </div>

              {/* Phone detail */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-pink/20 dark:bg-brand-pink-dark/30 text-brand-brown dark:text-brand-pink flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm text-brand-brown-dark dark:text-brand-cream">
                    Kontak Layanan Pelanggan
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Phone & WA: <strong className="text-brand-brown dark:text-brand-accent">+62 812-3456-7890</strong>
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Email: halo@sweetlovabakery.com
                  </p>
                </div>
              </div>

            </div>

            {/* Quick map instructions action */}
            <div className="pt-4 border-t border-gray-50 dark:border-zinc-900/60 flex flex-wrap gap-3">
              <a
                href="https://maps.apple.com/?address=Kemang%20Raya,%20Jakarta"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-brand-brown/40 text-xs text-brand-brown-dark dark:text-brand-cream font-semibold transition-all inline-flex items-center gap-1.5"
              >
                <Compass size={13} />
                <span>Petunjuk Arah</span>
              </a>
              <a
                href={`https://wa.me/6281234567890?text=Halo%20Sweetlova%20Bakery,%20saya%20ingin%20tanya%20mengenai%20rute%20menuju%20loka%20toko`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-brand-brown hover:bg-brand-brown-dark text-white text-xs font-semibold tracking-wide transition-all inline-flex items-center gap-1.5"
              >
                <span>Tanya Admin</span>
                <ExternalLink size={11} />
              </a>
            </div>

          </div>

          {/* Embedded Map Section - Right Side */}
          <div className="lg:col-span-7 h-[300px] lg:h-[420px] rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-lg relative bg-white">
            <iframe
              src={mapEmbedUrl}
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Lokasi Sweetlova Bakery"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
