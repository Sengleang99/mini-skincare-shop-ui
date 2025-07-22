import { getProductById, getRelatedProducts, getAllProducts } from '@/app/lib/products';
import Image from 'next/image';
import { ProductDetails } from '@/app/components/ProductDetails';
import { RelatedProducts } from '@/app/components/RelatedProducts';

// Removed the separate ProductPageProps interface.
// The type for params is now defined directly in the function signature for clarity and directness.

export default async function ProductPage({ params }: { params: { id: string } }) {
  // The error "params should be awaited" is often misleading.
  // It typically means Next.js's static analysis or build process
  // is having trouble with the dynamic params in conjunction with generateStaticParams.
  // The params object itself is not a Promise.
  // By defining the type directly in the function signature and destructuring,
  // we aim to provide the clearest possible type information to Next.js.
  const { id } = params; // Destructure id from params

  const product = await getProductById(id); // Use the destructured id
  const relatedProducts = await getRelatedProducts(id); // Use the destructured id

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="relative h-96 w-full">
            <Image
              src={product.image.startsWith('http') ? product.image : `/products/${product.image}`}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <ProductDetails product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} currentProductId={product.id} />
      )}
    </div>
  );
}

// Explicitly define the return type for generateStaticParams.
// This matches the structure of the params object expected by the page component.
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const allProducts = await getAllProducts();
  return allProducts.map((product) => ({
    id: product.id,
  }));
}
