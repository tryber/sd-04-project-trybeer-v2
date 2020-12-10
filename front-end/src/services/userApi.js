import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const login = (email, password) => api.post('/login', { email, password });

// const profile = (token) => api.post('/profile', { token });

// const changeProfile = (email, name) => api.put('/profile', { email, name });

const register = (name, email, password, role) => api.post('/register', {
  name, email, password, role,
});

export default {
  login,
  // profile,
  // changeProfile,
  register,
};
