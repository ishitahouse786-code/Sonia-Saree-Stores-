import express from 'express';
import cors from 'cors';
import Fuse from 'fuse.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { embed } from './src/api/ai/embeddings.js';
import { buildProductIndex } from './src/api/ai/vectorDb.js';
import { generateBengaliSuggestionMessage } from './src/api/ai/llm.js';
import { createOrder, listOrders, getOrderById, updateOrderStatus, ORDER_STATUSES } from './src/api/orders/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

function loadProducts() {
  const dataPath = path.join(__dirname, 'src', 'data', 'products.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const json = JSON.parse(raw);
  return json?.products || [];
}

const products = loadProducts();
const fuse = new Fuse(products, {
  keys: ['title_bn', 'description_bn', 'name', 'description', 'tags'],
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

let vectorIndexPromise = null;
async function getVectorIndex() {
  if (!vectorIndexPromise) {
    vectorIndexPromise = buildProductIndex(products);
  }
  return vectorIndexPromise;
}

app.get('/api/ai-search', (req, res) => {
  const q = (req.query.q || '').toString().trim();
  if (!q) return res.json({ query: q, results: products });
  const results = fuse.search(q).map((r) => r.item);
  res.json({ query: q, results });
});

app.post('/api/ai-search', async (req, res) => {
  try {
    const query = (req.body?.query || '').toString().trim();
    const index = await getVectorIndex();
    const qEmb = await embed(query);
    const top = await index.query(qEmb, { topK: 5 });
    const idSet = new Set(top.map((t) => t.id));
    const suggestions = products.filter((p) => idSet.has(p.id));
    const message = generateBengaliSuggestionMessage(query, suggestions);
    res.json({ suggestions, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Orders API
app.post('/api/orders', async (req, res) => {
  try {
    const { user, items } = req.body || {};
    if (!user || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid payload: { user, items[] } required' });
    }
    const order = await createOrder({ user, items });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await listOrders();
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to list orders' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed: ${ORDER_STATUSES.join(', ')}` });
    }
    const updated = await updateOrderStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});