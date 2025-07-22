// src/app/products/[id]/page.tsx
import { getProductById, getRelatedProducts } from '@/app/lib/products';
import Image from 'next/image';
import { ProductDetails } from '@/app/components/ProductDetails';
import { RelatedProducts } from '@/app/components/RelatedProducts';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);
  const relatedProducts = await getRelatedProducts(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-4 rounded-lg shadow-md relative h-96 w-full">
          <Image
            src={
              product.image.startsWith('http')
                ? product.image
                : `/products/${product.image}`
            }
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <ProductDetails product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} currentProductId={product.id} />
      )}
    </div>
  );
}
