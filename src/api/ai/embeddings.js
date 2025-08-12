export async function embed(text) {
  const dim = 256;
  const vector = new Float32Array(dim);
  if (!text) return vector;
  const lower = text.toLowerCase();
  // Use character 3-gram hashing to populate the vector
  for (let i = 0; i < lower.length; i++) {
    const a = lower.charCodeAt(i);
    const b = lower.charCodeAt(Math.min(i + 1, lower.length - 1));
    const c = lower.charCodeAt(Math.min(i + 2, lower.length - 1));
    const hash = (a * 31 + b * 17 + c * 13) % dim;
    vector[hash] += 1;
  }
  // Normalize to unit length
  let norm = 0;
  for (let i = 0; i < dim; i++) norm += vector[i] * vector[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < dim; i++) vector[i] /= norm;
  return vector;
}