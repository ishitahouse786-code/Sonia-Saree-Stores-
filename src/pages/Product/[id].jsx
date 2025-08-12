import React, { useState } from 'react';
import Header from '../../components/Header';
import data from '../../data/products.json';
import ProductCard from '../../components/ProductCard';
import WhatsAppOrderLink from '../../components/WhatsAppOrderLink';

export default function ProductDetail({ id }) {
  const product = (data?.products || []).find((p) => String(p.id) === String(id));

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qty, setQty] = useState(1);

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

            <section style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              <h3 style={{ margin: 0 }}>WhatsApp Order</h3>
              <input
                placeholder="নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8 }}
              />
              <input
                placeholder="ফোন"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8 }}
              />
              <input
                type="number"
                min={1}
                placeholder="পরিমাণ"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value) || 1)}
                style={{ padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, width: 120 }}
              />
              <div>
                <WhatsAppOrderLink product={product} name={name} phone={phone} qty={qty}>
                  WhatsApp এ অর্ডার পাঠান
                </WhatsAppOrderLink>
              </div>
            </section>
          </div>
        ) : (
          <div style={{ padding: 16 }}>{`Product ${id} not found`}</div>
        )}
      </main>
    </div>
  );
}