import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import data from '../data/products.json';

export default function Home() {
  const products = data?.products || [];

  return (
    <div>
      <Header />
      <main
        style={{
          padding: 16,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}