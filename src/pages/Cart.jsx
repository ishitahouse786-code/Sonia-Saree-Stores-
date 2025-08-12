import React from 'react';
import Header from '../components/Header';

export default function Cart() {
  return (
    <div>
      <Header />
      <main style={{ padding: 16 }}>
        <h1 style={{ margin: '12px 0' }}>Cart</h1>
        <p>Your cart is empty.</p>
      </main>
    </div>
  );
}