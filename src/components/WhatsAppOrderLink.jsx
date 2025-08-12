import React, { useMemo } from 'react';
import { buildWhatsAppOrderUrl } from '../utils/whatsapp';

export default function WhatsAppOrderLink({ product, name, phone, qty = 1, children }) {
  const href = useMemo(() => buildWhatsAppOrderUrl({ product, name, phone, qty }), [product, name, phone, qty]);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children || 'WhatsApp এ অর্ডার পাঠান'}
    </a>
  );
}