import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const getProducts = () => (api.get('/products'));

// const getOrders = (token) => (api.post('/orders', { token }));

export default {
  getProducts,
};
