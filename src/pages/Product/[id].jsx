import React from 'react';
import Header from '../../components/Header';
import data from '../../data/products.json';
import ProductCard from '../../components/ProductCard';

export default function ProductDetail({ id }) {
  const product = (data?.products || []).find((p) => String(p.id) === String(id));

  return (
    <div>
      <Header />
      <main style={{ padding: 16 }}>
        {product ? (
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <ProductCard product={product} />
            <section style={{ marginTop: 16 }}>
              <h2 style={{ margin: '12px 0' }}>Details</h2>
              <p style={{ color: '#374151' }}>{product.description}</p>
            </section>
          </div>
        ) : (
          <div style={{ padding: 16 }}>{`Product ${id} not found`}</div>
        )}
      </main>
    </div>
  );
}