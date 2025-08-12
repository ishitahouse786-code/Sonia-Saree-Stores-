import { readOrders, writeOrders, generateOrderId, generateTrackingNumber } from './store.js';

export const ORDER_STATUSES = ['placed', 'packed', 'shipped', 'delivered'];

export async function createOrder({ user, items }) {
  const orders = readOrders();
  const id = generateOrderId();
  const tracking_number = generateTrackingNumber();
  const status = 'placed';
  const created_at = new Date().toISOString();

  const order = { id, user, items: items || [], status, tracking_number, created_at };
  orders.push(order);
  writeOrders(orders);
  return order;
}

export async function listOrders() {
  return readOrders();
}

export async function getOrderById(id) {
  const orders = readOrders();
  return orders.find((o) => o.id === id) || null;
}

export async function updateOrderStatus(id, nextStatus) {
  if (!ORDER_STATUSES.includes(nextStatus)) {
    throw new Error(`Invalid status: ${nextStatus}`);
  }
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx].status = nextStatus;
  orders[idx].updated_at = new Date().toISOString();
  writeOrders(orders);
  return orders[idx];
}

export default { createOrder, listOrders, getOrderById, updateOrderStatus };