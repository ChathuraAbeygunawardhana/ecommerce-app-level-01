
export interface Product {
  id: string;
  name: string;
  mainImage: string;
  price: string;
  colour: string;
  description: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface FilterCriteria {
  priceRange?: [number, number];
  brand?: string;
  color?: string;
}