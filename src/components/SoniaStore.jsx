// Sonia Saree Stores — Full merged component file
// React + Tailwind
// Contains: i18n setup (en/bn), LanguageToggle, AISearchBar (server + Fuse fallback), ProductCard, HomeGrid
// Usage:
// 1) Place this file at src/components/SoniaStore.jsx
// 2) Install deps: npm i i18next react-i18next fuse.js
// 3) Provide a server endpoint /api/ai-search that proxies to OpenAI (recommended) OR rely on client-side fuzzy search fallback

import React, { useState, useEffect, useRef } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';

/* -------------------------
   i18n initialization
   ------------------------- */
const resources = {
  en: {
    translation: {
      search_placeholder: 'Search sarees, e.g., Red katan',
      toggle_language: 'বাংলা',
      ai_button: 'AI',
      load_more: 'Load more',
      new_arrivals: 'New Arrivals',
    }
  },
  bn: {
    translation: {
      search_placeholder: 'শাড়ি খুঁজুন, উদঃ: লাল কাতান',
      toggle_language: 'English',
      ai_button: 'এআই',
      load_more: 'আরও দেখুন',
      new_arrivals: 'নতুন শাড়ি',
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'bn', // default to Bengali
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

/* -------------------------
   Language Toggle Button
   ------------------------- */
function LanguageToggle() {
  const { t, i18n } = useTranslation();
  return (
    <button
      onClick={() => i18n.changeLanguage(i18n.language === 'bn' ? 'en' : 'bn')}
      className="px-3 py-2 rounded border bg-gray-100"
    >
      {t('toggle_language')}
    </button>
  );
}

/* -------------------------
   AI Search Bar
   - Attempts server AI via /api/ai-search (POST { query })
   - If server not available, falls back to client Fuse.js fuzzy search
   - onSearch should accept an array of product ids or product objects
   ------------------------- */
export function AISearchBar({ products, onSearch }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const fuseRef = useRef(null);

  useEffect(() => {
    if (products && products.length) {
      fuseRef.current = new Fuse(products, {
        keys: ['title_en', 'title_bn', 'description_en', 'description_bn', 'tags'],
        threshold: 0.35
      });
    }
  }, [products]);

  const doClientSearch = (q) => {
    if (!fuseRef.current) return [];
    const res = fuseRef.current.search(q).map(r => r.item);
    return res;
  };

  const handleAI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      // Try server-side AI first (recommended)
      const resp = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (resp.ok) {
        const data = await resp.json();
        // Expecting data.products as array of product ids or product objects
        onSearch(data.products || []);
      } else {
        // fallback: client fuzzy search
        const res = doClientSearch(query);
        onSearch(res);
      }
    } catch (err) {
      // fallback
      const res = doClientSearch(query);
      onSearch(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleAI(); }}
        placeholder={t('search_placeholder')}
        className="flex-1 border p-2 rounded"
      />
      <button onClick={handleAI} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? '...' : t('ai_button')}
      </button>
      <LanguageToggle />
    </div>
  );
}

/* -------------------------
   ProductCard (optimized)
   - expects product.image base name (webp files with -400/-800/-1200 suffixes)
   ------------------------- */
const PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%23e5e7eb'/></svg>";

export function ProductCard({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const src400 = `/images/${product.image}-400.webp`;
  const src800 = `/images/${product.image}-800.webp`;
  const src1200 = `/images/${product.image}-1200.webp`;

  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm">
      <div className="relative w-full overflow-hidden rounded-md" style={{ paddingTop: '75%' }}>
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <img
          src={src800}
          srcSet={`${src400} 400w, ${src800} 800w, ${src1200} 1200w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 33vw"
          alt={product.title_bn || product.title_en}
          className={`absolute left-0 top-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { e.currentTarget.src = PLACEHOLDER; setImgLoaded(true); }}
        />
      </div>

      <div className="mt-3">
        <h3 className="text-base font-semibold leading-tight">{product.title_bn || product.title_en}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description_bn ? product.description_bn : product.description_en}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold">৳ {product.price}</div>
          <div>
            <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">{product.addToCartText || 'কার্টে যোগ করুন'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   HomeGrid
   - supports updating products via onSearch results
   ------------------------- */
export function HomeGrid({ products }) {
  const [visibleCount, setVisibleCount] = useState(12);

  const visible = (products || []).slice(0, visibleCount);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">{i18n.t('new_arrivals')}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {visibleCount < (products || []).length && (
        <div className="flex justify-center mt-6">
          <button onClick={() => setVisibleCount(c => c + 12)} className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200">
            {i18n.t('load_more')}
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------
   Example page wrapper
   - This is a simple Home page that wires AISearchBar + HomeGrid
   ------------------------- */
export default function SoniaStorePage({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts || exampleProducts);

  // onSearch receives either array of products (from server) or ids; normalize
  const handleSearchResults = (results) => {
    if (!results) return;
    if (!Array.isArray(results)) return;

    // If results are product objects already
    if (results.length && results[0].id) {
      setProducts(results);
      return;
    }

    // Else treat results as array of ids
    const filtered = exampleProducts.filter(p => results.includes(p.id));
    if (filtered.length) setProducts(filtered);
    else setProducts([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <AISearchBar products={exampleProducts} onSearch={handleSearchResults} />
      <HomeGrid products={products} />
    </div>
  );
}

/* -------------------------
   Example products (demo data)
   - Replace with real API data in production
   ------------------------- */
export const exampleProducts = [
  {
    id: 1,
    image: 'red-katan',
    title_en: 'Red Katan Saree',
    title_bn: 'লাল কাতান শাড়ি',
    description_en: 'Elegant red katan saree with zari border.',
    description_bn: 'জারী বর্ডারসহ সুন্দর লাল কাতান শাড়ি।',
    price: '3500'
  },
  {
    id: 2,
    image: 'blue-kantha',
    title_en: 'Blue Kantha',
    title_bn: 'নীল কানথা শাড়ি',
    description_en: 'Hand-stitched kantha work.',
    description_bn: 'হ্যান্ড স্টিচড কানথা ডিজাইন।',
    price: '4200'
  },
  // add more demo products as needed
];

/* -------------------------
   Notes & Next Steps (short):
   1) Put WebP images in public/images named like: red-katan-400.webp, -800.webp, -1200.webp
   2) Provide an API route /api/ai-search on your server that accepts {query} and returns { products: [...] }
      - The server should use OpenAI embeddings + vector DB or a simple prompt to return matching product ids or objects.
   3) Install deps: npm i i18next react-i18next fuse.js
   4) If you want, I can provide a sample serverless function (Node/Express) that proxies to OpenAI safely.
*/