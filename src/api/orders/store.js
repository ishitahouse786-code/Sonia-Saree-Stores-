import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../../data/orders.json');

export function readOrders() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const json = JSON.parse(raw);
    return Array.isArray(json.orders) ? json.orders : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export function writeOrders(orders) {
  const payload = { orders };
  fs.writeFileSync(dataPath, JSON.stringify(payload, null, 2), 'utf-8');
}

export function generateOrderId() {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `ord_${stamp}_${rand}`;
}

export function generateTrackingNumber() {
  const seq = Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
  return `SONIA${seq}`;
}