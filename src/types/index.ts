export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  description: string;
  isNew?: boolean;
  isExclusive?: boolean;
  discount?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

export interface CartItem extends Product {
  quantity: number;
}
