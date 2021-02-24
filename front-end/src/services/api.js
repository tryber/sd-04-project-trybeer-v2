const axios = require('axios');

const api = axios.create({ baseURL: 'http://localhost:3001' });

export default api;
