// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import SearchBar from './SearchBar';

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Skincare Shop
        </Link>

        <div className="hidden md:block w-1/3">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/login" className="p-2">
            <User className="h-6 w-6 text-gray-700" />
          </Link>
        </div>
      </div>
    </nav>
  );
}