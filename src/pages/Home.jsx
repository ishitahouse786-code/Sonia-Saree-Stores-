import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import data from '../data/products.json';
import Fuse from 'fuse.js';

export default function Home() {
  const products = data?.products || [];

  const [searchQuery, setSearchQuery] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ['title_bn', 'description_bn', 'name', 'description', 'tags'],
      threshold: 0.38,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [fuse, products, searchQuery]);

  return (
    <div>
      <Header query={searchQuery} onSearch={setSearchQuery} />
      <main
        style={{
          padding: 16,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}