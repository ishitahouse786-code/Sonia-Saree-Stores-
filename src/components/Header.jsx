import React from 'react';
import SearchBar from './SearchBar';
import { brand } from '../config/brand';

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>{brand.name}</div>
        <span style={{ fontSize: 12, background: '#f3f4f6', color: '#111827', padding: '2px 6px', borderRadius: 6 }}>
          {brand.badge}
        </span>
      </div>
      <div style={{ flex: 1, marginLeft: 16, marginRight: 16 }}>
        <SearchBar value={query} onChange={onSearch} />
      </div>
    </header>
  );
}