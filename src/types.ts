export interface Product {
  id: string;
  name: string;
  category: 'all' | 'donat' | 'cake' | 'cupcake' | 'croissant' | 'cheesecake' | 'dessert_box';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  isPopular?: boolean;
  isPromo?: boolean;
  originalPrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PromoCountdown {
  title: string;
  subtitle: string;
  endTime: string; // ISO String
  discountProduct: Product;
}
