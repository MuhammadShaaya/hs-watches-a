// Core domain types for H&S Watches

export type WatchCollection =
  | "Classic"
  | "Sport"
  | "Chronograph"
  | "Smart Luxury"
  | "Limited Edition";

export type MovementType = "Automatic" | "Quartz" | "Manual Wind" | "Smart";
export type Gender = "Men" | "Women" | "Unisex";
export type StrapMaterial = "Leather" | "Steel" | "Rubber" | "Mesh" | "NATO";
export type CaseMaterial = "Stainless Steel" | "Titanium" | "Rose Gold" | "Yellow Gold" | "Ceramic";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
  order: number;
}

export interface ProductVariantOption {
  id: string;
  label: string;
  hex?: string;
  priceDelta?: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  barcode: string;
  name: string;
  brandName: string;
  collection: WatchCollection;
  gender: Gender;
  movement: MovementType;
  caseMaterial: CaseMaterial;
  caseSize: string; // e.g. "40mm"
  strapOptions: ProductVariantOption[];
  colorOptions: ProductVariantOption[];
  price: number;
  salePrice?: number;
  currency: "USD";
  stock: number;
  weightGrams: number;
  dimensions: string;
  shortDescription: string;
  description: string;
  specifications: { label: string; value: string }[];
  warranty: string;
  images: ProductImage[];
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  status: "Active" | "Draft";
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  selectedColor?: string;
  selectedStrap?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  userId: string | "guest";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "COD";
  shippingAddress: Address;
  orderNotes?: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
  timeline: { status: OrderStatus; date: string }[];
}

export type UserRole = "admin" | "manager" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // demo only — plaintext, never do this in production
  role: UserRole;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  createdAt: string;
  blocked: boolean;
}

export interface CartLine {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedStrap?: string;
  selectedSize?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expiry: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  date: string;
  comments: { id: string; name: string; comment: string; date: string }[];
}

export interface InventoryLog {
  id: string;
  productId: string;
  change: number;
  reason: string;
  date: string;
}

export interface Notification {
  id: string;
  message: string;
  type: "order" | "stock" | "review" | "system";
  read: boolean;
  date: string;
}
