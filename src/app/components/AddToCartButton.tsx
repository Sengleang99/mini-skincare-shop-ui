// src/components/AddToCartButton.tsx
'use client';

import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/type/types';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      disabled={isInCart(product.id)}
      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md ${
        isInCart(product.id)
          ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
          : 'bg-rose-500 text-white hover:bg-rose-600'
      } transition-colors`}
    >
      <ShoppingCart className="h-4 w-4" />
      {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
}