import {
  getProductById,
  getRelatedProducts,
  getAllProducts,
} from "@/app/lib/products";
import Image from "next/image";
import { ProductDetails } from "@/app/components/ProductDetails";
import { RelatedProducts } from "@/app/components/RelatedProducts";

// Define the type for the params object
type ProductPageParams = {
  id: string;
};

// Use this type directly in the function signature for clarity and consistency
export default async function ProductPage({
  params,
}: {
  params: ProductPageParams;
}) {
  const product = await getProductById(params.id);
  const relatedProducts = await getRelatedProducts(params.id);

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

// Add this at the bottom of the same file
// Explicitly define the return type for generateStaticParams to match ProductPageParams
export async function generateStaticParams(): Promise<ProductPageParams[]> {
  const allProducts = await getAllProducts();
  return allProducts.map((product) => ({
    id: product.id,
  }));
}
