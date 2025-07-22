// src/components/ProductDetails.tsx
'use client';

import { Product } from '@/app/type/types';
import { useState } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { Star } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'benefits'>('details');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-2">
          ({product.rating.toFixed(1)}) • {product.reviews} reviews
        </span>
      </div>

      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
      </div>

      <div className="mb-6">
        <AddToCartButton product={product} />
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Details
            </button>
            {product.ingredients && (
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ingredients'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ingredients
              </button>
            )}
            {product.benefits && (
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'benefits'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Benefits
              </button>
            )}
          </nav>
        </div>

        <div className="py-4">
          {activeTab === 'details' && (
            <div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Gentle enough for daily use</li>
                <li>Dermatologist tested</li>
                <li>Cruelty-free and vegan</li>
                <li>Free from parabens and sulfates</li>
              </ul>
            </div>
          )}

          {activeTab === 'ingredients' && product.ingredients && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Key Ingredients:</h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'benefits' && product.benefits && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Benefits:</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="text-gray-700">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Category:</span>
          <span className="font-medium text-gray-900 capitalize">{product.category}</span>
        </div>
      </div>
    </div>
  );
}