import React from 'react';
import SearchBar from './SearchBar';

export default function Header({ query = '', onSearch = () => {} }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 10,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18 }}>Saree Shop</div>
      <div style={{ flex: 1, marginLeft: 16, marginRight: 16 }}>
        <SearchBar value={query} onChange={onSearch} />
      </div>
    </header>
  );
}