// src/components/SearchBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        router.push(`/?search=${encodeURIComponent(query)}`);
      } else {
        router.push('/');
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search skincare products..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}