const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса');
  return data;
}

export const api = {
  getMyOrders: () => request('/orders/my'),
  getAllOrders: (status) => request('/orders' + (status ? `?status=${encodeURIComponent(status)}` : '')),
  getOrder: (id) => request(`/orders/${id}`),
  createOrder: (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
  createPublicOrder: (body) => request('/orders/public', { method: 'POST', body: JSON.stringify(body) }),
  updateOrderStatus: (id, body) => request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify(body) }),
  sendOrderMessage: (id, body) => request(`/orders/${id}/messages`, { method: 'POST', body: JSON.stringify(body) }),
};
