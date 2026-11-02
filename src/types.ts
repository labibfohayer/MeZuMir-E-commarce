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
