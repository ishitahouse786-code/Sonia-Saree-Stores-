export async function createOrder(orderInput) {
  const orderId = Math.random().toString(36).slice(2, 10);
  return {
    id: orderId,
    status: 'received',
    items: orderInput?.items || [],
    total: orderInput?.total || 0,
    createdAt: new Date().toISOString(),
  };
}

export default { createOrder };