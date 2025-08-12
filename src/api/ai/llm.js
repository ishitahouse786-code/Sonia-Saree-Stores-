export function generateBengaliSuggestionMessage(query, products) {
  if (!query) {
    return 'আপনি কী খুঁজছেন লিখুন। আমরা উপযুক্ত শাড়ি সাজেস্ট করব।';
  }
  const topLines = products.slice(0, 5).map((p, i) => `${i + 1}) ${p.name} — ৳${p.price}`);
  return `আপনার খোঁজ: "${query}"। নিচের পণ্যগুলো আপনার জন্য প্রাসঙ্গিক হতে পারে:\n` + topLines.join('\n');
}