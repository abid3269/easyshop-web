import { mockOrders } from '../data/mockData';

export const fetchOrders = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Get orders from localStorage
  const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');

  // Combine with mock orders from data file
  return [...localOrders, ...mockOrders].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const fetchOrderById = async (orderId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const allOrders = await fetchOrders();
  return allOrders.find(order => order.id === orderId);
};
