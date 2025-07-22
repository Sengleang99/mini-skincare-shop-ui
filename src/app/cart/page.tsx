// src/app/cart/page.tsx
'use client';

import { CartItem } from '@/app/components/CartItem';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!cart || totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          href="/"
          className="inline-block bg-rose-500 text-white px-6 py-3 rounded-md hover:bg-rose-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({totalItems} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {Array.isArray(cart) &&
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
          </div>
          <button
            onClick={clearCart}
            className="mt-4 text-rose-500 hover:text-rose-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-rose-500 text-white text-center py-3 rounded-md hover:bg-rose-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
