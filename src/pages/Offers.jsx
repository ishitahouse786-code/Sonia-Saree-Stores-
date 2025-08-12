import React from 'react';
import Header from '../components/Header';

export default function Offers() {
  return (
    <div>
      <Header />
      <main style={{ padding: 16 }}>
        <h1 style={{ margin: '12px 0' }}>Offers</h1>
        <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
          <li>10% off on red Katan sarees</li>
          <li>Free delivery over ৳2000</li>
        </ul>
      </main>
    </div>
  );
}