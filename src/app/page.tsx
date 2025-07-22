// src/app/page.tsx
import { ProductCard } from './components/ProductCard';
import { getAllProducts } from './lib/products';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import './style/globals.css'

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Skincare Essentials</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar />
          <Filters />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}