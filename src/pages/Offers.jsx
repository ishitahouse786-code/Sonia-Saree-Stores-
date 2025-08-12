import React from 'react';
import Header from '../components/Header';
import offersData from '../data/offers.json';
import { isOfferCurrentlyActive } from '../utils/offers';

export default function Offers() {
  const offers = offersData?.offers || [];

  return (
    <div>
      <Header />
      <main style={{ padding: 16 }}>
        <h1 style={{ margin: '12px 0' }}>Offers</h1>
        <div style={{ display: 'grid', gap: 12 }}>
          {offers.map((offer) => {
            const active = isOfferCurrentlyActive(offer);
            return (
              <div key={offer.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{offer.code}</div>
                  <div style={{ fontSize: 13, color: '#374151' }}>
                    {offer.type === 'percent' ? `${offer.value}% off` : `৳${offer.value} off`}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    {new Date(offer.starts_at).toLocaleDateString()} - {new Date(offer.ends_at).toLocaleDateString()}
                  </div>
                </div>
                <span style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: active ? '#ecfdf5' : '#f3f4f6', color: active ? '#065f46' : '#111827' }}>
                  {active ? 'Active' : 'Inactive'}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}