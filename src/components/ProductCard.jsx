import React from 'react';
import { t } from '../i18n/strings';

export default function ProductCard({ product, onAddToCart = () => {}, onOrderNow = () => {} }) {
  if (!product) return null;

  const isSlugImage = product.image && !/^https?:\/\//i.test(product.image);
  const responsiveSrc = isSlugImage ? `/images/${product.image}-800.webp` : product.image;
  const responsiveSrcSet = isSlugImage
    ? `/images/${product.image}-400.webp 400w, /images/${product.image}-800.webp 800w`
    : undefined;
  const responsiveSizes = isSlugImage ? '(max-width: 640px) 100vw, 33vw' : undefined;
  const altText = product.title_bn || product.name || 'Product image';

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {product.image && (
        <img
          src={responsiveSrc}
          srcSet={responsiveSrcSet}
          sizes={responsiveSizes}
          alt={altText}
          className="w-full h-64 object-cover rounded-md"
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: 220, objectFit: 'cover' }}
        />
      )}
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontWeight: 600 }}>{product.name}</div>
        <div style={{ color: '#ef4444', fontWeight: 700 }}>৳ {product.price}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            onClick={() => onAddToCart(product)}
            style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer' }}
          >
            {t('add_to_cart')}
          </button>
          <button
            onClick={() => onOrderNow(product)}
            style={{ flex: 1, padding: '8px 10px', border: 'none', borderRadius: 8, background: '#111827', color: '#fff', cursor: 'pointer' }}
          >
            {t('order_now')}
          </button>
        </div>
      </div>
    </div>
  );
}