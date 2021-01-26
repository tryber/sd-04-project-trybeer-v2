import axios from 'axios';
import socketIoClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3002';
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

export const changeStatus = async (id, status) => axios
  .put(`${url}/admin/orders/${id}`, { status })
  .catch(({ response }) => response);

// socketIoClient
export const clientConnect = () => {
  const socket = socketIoClient(ENDPOINT);
  // socket.emit('message', 'Oiii!');
  /* const { id } = socket;
  console.log('CLient-Id: ', socket);
  console.log('socket-Id: ', id); */
  return socket;
};

export const clientDesconnect = (socket) => {
  socket.disconnect();
};

export const clientSendMessage = (socket, msgData) => {
  socket.emit('message', msgData);
};

// histórico das mensagens
export const previousMessages = (chat) => {
  const socket = socketIoClient(ENDPOINT);
  socket.connect();
  socket.emit('previousMessages', chat);
};
