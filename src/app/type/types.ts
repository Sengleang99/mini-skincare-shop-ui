// src/types/types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  ingredients?: string[];
  benefits?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}