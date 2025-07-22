// src/components/RelatedProducts.tsx
import { Product } from '@/app/type/types';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter((product) => product.id !== currentProductId)
          .slice(0, 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}