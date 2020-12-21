import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// método para que as info sejam passados como json
const headers = {
  'Content-Type': 'application/json',
};

const registerUserAPI = async (name, email, password, role) => {
  try {
    const result = await api.post(
      '/user',
      {
        name,
        email,
        password,
        role,
      },
      headers,
    );
    return result;
  } catch (err) {
    return err.response;
  }
};

const loginAPI = (email, password) => api.post('/login', { email, password });

const getSalesTb = async () => {
  try {
    const result = await api.get('/sales', headers);
    if (!result) throw Error;
    return result;
  } catch (err) {
    return err.response;
  }
};

const getSalesByIdAPI = async (id) => {
  try {
    const result = await api.get(`/sales/details/${id}`, headers);
    if (!result) throw Error;
    return result;
  } catch (err) {
    return err.response;
  }
};

const insertSaleAPI = async (
  userId,
  totalPrice,
  deliveryAddr,
  deliveryNumber,
  productId,
  quantity,
) => {
  await api.post(
    '/sales',
    {
      userId,
      totalPrice,
      deliveryAddr,
      deliveryNumber,
      productId,
      quantity,
    },
    headers,
  );
};

const productsAPI = async () => {
  const { data } = await api.get('/products');
  return data;
};

const updateUserAPI = (name, email) => api.put('/user/update', { name, email });

const getSaleByIdAPI = (id) => api.get(`/sales/${id}`);

const updateSaleStatusAPI = (id, status) => api.put(`/sales/${id}`, { status });

export default {
  registerUserAPI,
  loginAPI,
  getSalesTb,
  getSalesByIdAPI,
  insertSaleAPI,
  productsAPI,
  updateUserAPI,
  getSaleByIdAPI,
  updateSaleStatusAPI,
};
