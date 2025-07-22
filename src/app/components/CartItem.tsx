// src/components/CartItem.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/app/type/types';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex p-4 border-b border-gray-200">
      <Link href={`/products/${item.id}`} className="flex-shrink-0">
        <div className="relative h-24 w-24">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-md"
            sizes="100px"
          />
        </div>
      </Link>

      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <Link href={`/products/${item.id}`}>
              <h3 className="text-lg font-medium text-gray-900 hover:text-rose-500">
                {item.name}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-rose-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center mt-4">
          <label htmlFor={`quantity-${item.id}`} className="sr-only">
            Quantity
          </label>
          <select
            id={`quantity-${item.id}`}
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="ml-2 text-sm text-gray-500">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}