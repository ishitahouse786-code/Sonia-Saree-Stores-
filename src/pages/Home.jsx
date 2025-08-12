import React, { useState } from "react";
import HomeGrid, { exampleProducts } from "../components/ProductCard";
import AISearchBar from "../components/AISearchBar";
import "../i18n";

export default function Home() {
  const [products, setProducts] = useState(exampleProducts);

  const handleAISearch = (suggestion) => {
    const text = String(suggestion || '').toLowerCase();
    const filtered = exampleProducts.filter(p =>
      (p.title_bn && p.title_bn.toLowerCase().includes(text)) ||
      (p.title_en && p.title_en.toLowerCase().includes(text))
    );
    setProducts(filtered);
  };

  return (
    <div className="p-4">
      <AISearchBar onSearch={handleAISearch} />
      <HomeGrid initialProducts={products} />
    </div>
  );
}