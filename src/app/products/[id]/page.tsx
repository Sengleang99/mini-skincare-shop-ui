import {
  getProductById,
  getRelatedProducts,
  getAllProducts, // Make sure getAllProducts is imported for generateStaticParams
} from "@/app/lib/products";
import Image from "next/image";
import { ProductDetails } from "@/app/components/ProductDetails";
import { RelatedProducts } from "@/app/components/RelatedProducts";

// Define the props type for the page component, noting params is a Promise
interface ProductPageProps {
  params: Promise<{ id: string }>; // params is now a Promise in Next.js 15
  // If you were using searchParams, they would also be a Promise:
  // searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params Promise to get the actual object
  const resolvedParams = await params;
  const productId = resolvedParams.id; // Access id from the resolved object

  // Fetch product data using the resolved productId
  const product = await getProductById(productId);
  const relatedProducts = await getRelatedProducts(productId);

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="relative h-96 w-full">
            <Image
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `/products/${product.image}`
              }
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
        <RelatedProducts
          products={relatedProducts}
          currentProductId={product.id}
        />
      )}
    </div>
  );
}

// generateStaticParams should remain in the page.tsx file
// It provides the paths for static generation at build time.
export async function generateStaticParams(): Promise<{ id: string }[]> {
  // Use your data fetching function to get all product IDs
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id, // The 'id' here is the dynamic segment value
  }));
}
