"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, PRICE_RANGES } from "@/app/lib/products";
import { useEffect, useState } from "react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | "">(
    searchParams.get("category") ?? ""
  );
  const [selectedPrice, setSelectedPrice] = useState<string | "">(
    searchParams.get("price") ?? ""
  );

  // Update URL whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedPrice) params.set("price", selectedPrice);
    router.push(`/?${params.toString()}`);
  }, [selectedCategory, selectedPrice, router]);

  return (
    <div className="flex flex-wrap gap-2">
      <select
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      >
        <option value="">All Prices</option>
        {PRICE_RANGES.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
}
