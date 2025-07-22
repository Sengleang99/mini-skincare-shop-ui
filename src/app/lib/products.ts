// src/lib/products.ts
import { Product } from "@/app/type/types";

// Sample skincare products data
const products: Product[] = [
  {
    id: "1",
    name: "Hydrating Facial Cleanser",
    description:
      "Gentle cleanser that removes impurities without stripping skin of moisture.",
    price: 24.99,
    image:
      "https://i.pinimg.com/736x/ad/92/b3/ad92b36defb6c37638fef2231c620e98.jpg",
    category: "cleanser",
    rating: 4.8,
    reviews: 125,
    ingredients: ["Aloe Vera", "Hyaluronic Acid", "Glycerin"],
    benefits: ["Hydrates", "Cleanses", "Soothes"],
  },
  {
    id: "2",
    name: "Vitamin C Serum",
    description:
      "Brightening serum with antioxidants to improve skin tone and texture.",
    price: 34.99,
    image:
      "https://i.pinimg.com/736x/7d/bd/aa/7dbdaae81eb69bff45a9a2dcd0b73403.jpg",
    category: "serum",
    rating: 4.9,
    reviews: 210,
    ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E"],
    benefits: ["Brightens", "Protects", "Firms"],
  },

  {
    id: "3",
    name: "Vitamin C Serum",
    description:
      "Brightening serum with antioxidants to improve skin tone and texture.",
    price: 34.99,
    image:
      "https://i.pinimg.com/736x/11/60/7b/11607b7fcb9722f621583f6e1eb289ce.jpg",
    category: "serum",
    rating: 4.9,
    reviews: 210,
    ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E"],
    benefits: ["Brightens", "Protects", "Firms"],
  },

  {
    id: "4",
    name: "Hydrating Facial Cleanser",
    description:
      "Gentle cleanser that removes impurities without stripping skin of moisture.",
    price: 24.99,
    image:
      "https://i.pinimg.com/1200x/b4/f0/1f/b4f01f3d796427d2263def43e27fd37f.jpg",
    category: "cleanser",
    rating: 4.8,
    reviews: 125,
    ingredients: ["Aloe Vera", "Hyaluronic Acid", "Glycerin"],
    benefits: ["Hydrates", "Cleanses", "Soothes"],
  },

  {
    id: "5",
    name: "Hydrating Facial Cleanser",
    description:
      "Gentle cleanser that removes impurities without stripping skin of moisture.",
    price: 24.99,
    image:
      "https://i.pinimg.com/1200x/e5/ba/59/e5ba59a53a02e482a215d742ea421e89.jpg",
    category: "cleanser",
    rating: 4.8,
    reviews: 125,
    ingredients: ["Aloe Vera", "Hyaluronic Acid", "Glycerin"],
    benefits: ["Hydrates", "Cleanses", "Soothes"],
  },
  // Add more products...
];

export const CATEGORIES = [
  { value: "cleanser", label: "Cleansers" },
  { value: "serum", label: "Serums" },
  { value: "moisturizer", label: "Moisturizers" },
  { value: "sunscreen", label: "Sunscreens" },
  { value: "mask", label: "Face Masks" },
];

export const PRICE_RANGES = [
  { value: "0-25", label: "Under $25" },
  { value: "25-50", label: "$25 - $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-", label: "Over $100" },
];

export async function getAllProducts(
  search?: string,
  filters?: { category?: string; price?: string }
) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let result = [...products];

  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.category) {
    result = result.filter((product) => product.category === filters.category);
  }

  if (filters?.price) {
    const [min, max] = filters.price.split("-").map(Number);
    result = result.filter((product) => {
      if (isNaN(min)) return product.price >= max;
      if (isNaN(max)) return product.price <= min;
      return product.price >= min && product.price <= max;
    });
  }

  return result;
}

export async function getProductById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products.find((product) => product.id === id);
}

export async function getRelatedProducts(id: string, limit = 4) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const product = products.find((p) => p.id === id);
  if (!product) return [];
  return products
    .filter((p) => p.id !== id && p.category === product.category)
    .slice(0, limit);
}
