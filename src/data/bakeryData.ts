import { Product, Review, FAQItem } from '../types';

// Let's import or reference our generated images directly
export const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: '/src/assets/images/hero_donuts_1779635880967.png',
    title: 'Kelembutan Donat Klasik Premium',
    subtitle: 'Dibuat dengan bahan organik terbaik & rahasia resep turun-temurun untuk kebahagiaan gigitan Anda.',
    tag: 'Artisanal Donuts'
  },
  {
    id: 'slide-2',
    image: '/src/assets/images/hero_cake_1779635896214.png',
    title: 'Custom Cake Mewah & Istimewa',
    subtitle: 'Wujudkan mimpi pesta ulang tahun impian Anda dengan dekorasi cake mewah yang memanjakan mata dan lidah.',
    tag: 'Couture Cakes'
  },
  {
    id: 'slide-3',
    image: '/src/assets/images/hero_bakery_interior_1779635912128.png',
    title: 'Kehangatan Interior Sweetlova',
    subtitle: 'Singgahlah sejenak ke butik roti kami yang aesthetic untuk menikmati aroma panggangan segar setiap pagi.',
    tag: 'Premium Experience'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'donat-1',
    name: 'Glazed Velvet Rose Donut',
    category: 'donat',
    price: 24000,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
    description: 'Donat artisan bertekstur selembut sutra dengan sentuhan glaze kelopak mawar pink pastel alami dan serpihan emas 24 karat yang aman dikonsumsi.',
    isPopular: true
  },
  {
    id: 'donat-2',
    name: 'Pistachio Dream Ring',
    category: 'donat',
    price: 26000,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&w=600&q=80',
    description: 'Donat ragi panggang lembut dengan balutan krim pistachio premium Italia, berpayung taburan kacang pistachio panggang renyah.',
    isPromo: true,
    originalPrice: 32000
  },
  {
    id: 'cake-1',
    name: 'Premium Strawberry Chiffon Celebration',
    category: 'cake',
    price: 285000,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Kue chiffon super lembut bertabur buah strawberry segar dari perkebunan organik lokal, dipadukan krim chantilly ringan tanpa kemanisan berlebih.',
    isPopular: true
  },
  {
    id: 'cake-2',
    name: 'Belgian Truffle Fudge Cake',
    category: 'cake',
    price: 310000,
    rating: 5.0,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    description: 'Lapisan tebal krim ganache cokelat Belgia pekat dengan sponge cake lembap beraroma espresso segar. Pemuas sejati para pecinta cokelat.',
    isPopular: true
  },
  {
    id: 'cupcake-1',
    name: 'Velvet Dream Cupcake Trio',
    category: 'cupcake',
    price: 45000,
    rating: 4.7,
    reviewsCount: 75,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    description: 'Kombinasi 3 cupcake red velvet andalan kami dengan frosting cream cheese asam legit manis, dihiasi butiran mutiara gula mutiara.',
    isPromo: true,
    originalPrice: 55000
  },
  {
    id: 'cupcake-2',
    name: 'Sweet Lavender Vanilla Mist',
    category: 'cupcake',
    price: 18000,
    rating: 4.6,
    reviewsCount: 61,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80',
    description: 'Cupcake vanilla beraroma lavender lembut dengan dekorasi frosting berwarna pastel ungu muda yang menawan.',
  },
  {
    id: 'croissant-1',
    name: 'Parisian Classic Butter Croissant',
    category: 'croissant',
    price: 28000,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'Croissant legendaris dengan 27 lipatan mentega wisman krispi berkualitas, renyah di luar dengan struktur sarang lebah sempurna di dalam.',
    isPopular: true
  },
  {
    id: 'croissant-2',
    name: 'Double Almond Flaky Croissant',
    category: 'croissant',
    price: 34000,
    rating: 4.8,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1549903072-7eb64187e791?auto=format&fit=crop&w=600&q=80',
    description: 'Dibalut dengan sirup rum non-alkohol, diisi dengan krim almond manis buatan sendiri, dan bertabur irisan almond panggang harum berlimpah.',
  },
  {
    id: 'cheesecake-1',
    name: 'Glazed Berry Basque Creamy',
    category: 'cheesecake',
    price: 42000,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    description: 'Basque burnt cheesecake dengan bagian tengah yang meleleh lumer, dipadukan lumatan selai berry asam manis segar.',
    isPopular: true
  },
  {
    id: 'cheesecake-2',
    name: 'Matcha Blossom Cheesecake Slice',
    category: 'cheesecake',
    price: 39000,
    rating: 4.8,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
    description: 'Paduan keju premium dengan teh bubuk hijau Uji Matcha Kyoto Jepang asli, menghasilkan keseimbangan rasa manis gurih-pahit yang elegan.',
  },
  {
    id: 'dessert-1',
    name: 'Triple Belgian Fudge Dessert Box',
    category: 'dessert_box',
    price: 65000,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=600&q=80',
    description: 'Kombinasi chocolate mousse padat, cake lembut rasa cokelat pekat, dan siraman ganache Belgia berkilau dalam wadah higienis praktis.',
    isPopular: true
  },
  {
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
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'review-1',
    name: 'Nadia Syafira',
    role: 'Food Blogger & Connaisseur',
    rating: 5,
    comment: 'Sweetlova Bakery adalah standar baru untuk dessert premium! Donat Glazed Velvet Rose mereka rasanya lembut di mulut dan aromanya wangi sekali. Seluruh outletnya juga sangat aesthetic dan instagramable!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'review-2',
    name: 'Adrian Pratama',
    role: 'Pelanggan Setia',
    rating: 5,
    comment: 'Setiap merayakan ulang tahun keluarga, pesanan cake saya selalu jatuh ke Sweetlova. Rasa cokelat Belgian Fudge-nya super intens dan ga kemanisan. Pelayanannya ramah, selalu tepat waktu, bintang sepuluh!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'review-3',
    name: 'Farah Salsabila',
    role: 'Pecinta Croissant',
    rating: 5,
    comment: 'Paten banget rasa butter croissant-nya ! Crispy garing banget di luar, waktu digigit kerasa buttery, mengembang indah. Sangat cocok disandingkan dengan secangkir kopi panas di pagi hari.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    title: 'Adonan Segar Artisan',
    category: 'process'
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=500&q=80',
    title: 'Keceriaan Cupcake Cantik',
    category: 'products'
  },
  {
    id: 'gal-3',
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
    title: 'Kehangatan Dari Oven',
    category: 'process'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=500&q=80',
    title: 'Detail Topping Menggoda',
    category: 'details'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80',
    title: 'Pilihan Buah Segar Pilihan',
    category: 'details'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    title: 'Boutique Bakery Modern',
    category: 'interior'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Apakah produk Sweetlova Bakery halal?',
    answer: 'Ya, seluruh produk Sweetlova Bakery dibuat 100% menggunakan bahan-bahan bersertifikasi Halal MUI, tanpa alkohol (no-alcohol), dan tanpa lemak babi (no-lard).'
  },
  {
    question: 'Apakah bisa memesan custom cake untuk acara ulang tahun atau pernikahan?',
    answer: 'Tentu saja! Kami menerima pesanan custom cake sesuai tema pilihan Anda. Kami menyarankan untuk melakukan pemesanan minimal H-3 sebelum acara melalui kontak WhatsApp Admin kami.'
  },
  {
    question: 'Bagaimana cara mendaftarkan diri untuk pengiriman instan?',
    answer: 'Kami bermitra dengan layanan pengiriman instan ojek online tercepat. Anda juga dapat langsung memesan melalui website ini, lalu tim admin kami akan segera membantu koordinasi kurir instan ke alamat Anda.'
  },
  {
    question: 'Berapa lama kue Sweetlova dapat bertahan?',
    answer: 'Untuk ketahanan rasa maksimal: Cake & Cheesecake tahan 3-4 hari disimpan di lemari es. Donat dan Croissant paling nikmat disantap langsung di hari pemanggangan, namun dapat bertahan 2 hari dalam wadah kedap udara bersuhu ruangan.'
  }
];
