export type ProductCategory = 'available' | 'seasonal' | 'coming_soon' | 'winter';

export interface Product {
  id: string;
  name: string;
  bengaliName: string;
  price: number;
  unit: string;
  category: ProductCategory;
  image: string;
  statusBadge: string;
  isOrderable: boolean;
  portionNote?: string;
  details?: {
    ingredients?: string;
    tasteLevel?: string;
    portion?: string;
    allergenInfo?: string;
  };
  seasonalNote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  customerName: string;
  phone: string;
  areaAddress: string;
  paymentMethod: 'bKash' | 'Cash on Delivery';
  specialNotes?: string;
}

export type OrderStatus = 'new' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';

export interface RecordedOrder {
  id: string;
  customerName: string;
  phone: string;
  areaAddress: string;
  paymentMethod: 'bKash' | 'Cash on Delivery';
  specialNotes?: string;
  items: {
    productId: string;
    productName: string;
    unit: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface StoreSettings {
  name: string;
  headline: string;
  subheadline: string;
  tagline: string;
  identity: string;
  serviceArea: string;
  deliveryChargeText: string;
  minOrderAmount: number;
  bkashNumber: string;
  phone: string;
  whatsappUrl: string;
  facebookUrl: string;
  orderHours: string;
  deliveryTimeEstimate: string;
  announcementNotice?: string;
}
