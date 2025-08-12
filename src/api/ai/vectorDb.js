import { embed } from './embeddings.js';

function combineProductText(product) {
  const parts = [
    product.title_bn,
    product.description_bn,
    product.name,
    product.description,
    Array.isArray(product.tags) ? product.tags.join(' ') : undefined,
  ].filter(Boolean);
  return parts.join(' \n ');
}

export async function buildProductIndex(products) {
  const ids = [];
  const vectors = [];
  for (const product of products) {
    const text = combineProductText(product);
    const vec = await embed(text);
    ids.push(product.id);
    vectors.push(vec);
  }

  function cosineSim(a, b) {
    let dot = 0;
    for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
    return dot;
  }

  return {
    async query(queryVector, { topK = 5 } = {}) {
      const scored = vectors.map((vec, idx) => ({ id: ids[idx], score: cosineSim(queryVector, vec) }));
      scored.sort((x, y) => y.score - x.score);
      const top = scored.slice(0, topK);
      return top;
    },
  };
}