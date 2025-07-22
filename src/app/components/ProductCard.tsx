// src/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/type/types';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={product.image || '/fallback.jpg'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            <span className="text-sm text-yellow-500">
              {product.rating} ★ ({product.reviews})
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
