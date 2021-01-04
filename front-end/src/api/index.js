import axios from 'axios';

const url = 'http://localhost:3001';
// const mockURL = 'https://my-json-server.typicode.com/pedrotpo/trybeer-mockapi/users';

export const userLogin = async (email, password) => axios
  .post(`${url}/login`, { email, password })
  .catch(({ response }) => response);

export const userUpdate = async (id, name) => axios
  .put(`${url}/profile`, { id, name })
  .catch(({ response }) => response);

export const postRegister = async (signName, signEmail, signPassword, signRole) => axios
  .post(`${url}/register`, {
    signName,
    signEmail,
    signPassword,
    signRole,
  })
  .catch(({ response }) => response);

export const listProducts = async () => axios
  .get(`${url}/products`)
  .catch(({ response }) => response);

// mock da página de pedidos (/Orders)
// const mockSales = 'https://my-json-server.typicode.com/josiasviveiro/trybeer-mockapi/sales';

// export const getOrders = async () => axios
//   .get(mockSales)
//   .catch(({ response }) => response);

// Pega os pedidos do banco de dados
export const getOrders = async (userId) => axios
  .get(`${url}/orders?userId=${userId}`)
  .catch(({ response }) => response);

export const getAllSales = async () => axios
  .get(`${url}/admin/orders`)
  .catch(({ response }) => response);

export const postCheckout = async (
  products, status, date, userId, cartValue, addressValue, numberValue) => axios
  .post(`${url}/sales`, {
    products, status, date, userId, cartValue, addressValue, numberValue,
  })
  .catch((error) => error.response.data);

export const getSalesDetails = async (id) => axios
  .get(`${url}/orders/${id}`)
  .catch(({ response }) => response);

export const getAllSalesDetails = async (id) => axios
  .get(`${url}/admin/orders/${id}`)
  .catch(({ response }) => response);

export const changeStatus = async (id) => axios
  .put(`${url}/admin/orders/${id}`)
  .catch(({ response }) => response);
