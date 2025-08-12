import React from 'react';
import { t } from '../i18n/strings';

export default function SearchBar({ value = '', onChange = () => {} }) {
  return (
    <input
      type="search"
      placeholder={t('search_placeholder')}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8 }}
    />
  );
}