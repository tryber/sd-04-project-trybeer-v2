import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { EMAIL_PATTERN, PASS_LENGTH, setLocalStorage } from '../../validation';

import userIcon from '../../assets/user.svg';

import './style.css';
import api from '../../services/api';

const checkEmail = (email) => EMAIL_PATTERN.test(email);
const checkPass = (password) => password !== ' ' && password.length >= PASS_LENGTH;

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // {
  //   "name": "Taylor Swift",
  //   "email": "taylorswift@email.com",
  //   "token": "eyJhb",
  //   "role": "client"
  // }

  // const saveUserData = (userData) => {
  //   localStorage.setItem('user', JSON.stringify(userData));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/login', { email, password });
    // console.log('Cade o login? ', response);
    if (response.data.role === 'administrator') {
      // saveUserData(response.data);
      setLocalStorage(response.data);
      history.push('/admin/orders');
    } else {
      // saveUserData(response.data);
      setLocalStorage(response.data);
      history.push('/products');
    }
  };

  return (
    <div className="main-container-form">
      <img src={ userIcon } alt="Login" className="user-icon" />
      <form onSubmit={ handleSubmit } className="login-form">
        <label className="login-label" htmlFor="emailInput">
          Email
          <input
            type="text"
            id="emailInput"
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="email-input"
          />
        </label>

        <label className="login-label" htmlFor="passwordInput">
          Password
          <input
            type="password"
            id="passwordInput"
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="password-input"
          />
        </label>

        <div className="buttons">
          <button
            type="submit"
            data-testid="signin-btn"
            disabled={ !checkEmail(email) || !checkPass(password) }
            className="login-button"
          >
            ENTRAR
          </button>
        </div>
      </form>
      <Link to="/register" data-testid="no-account-btn" className="register-link">
        Ainda não tenho conta
      </Link>
    </div>
  );
};

export default Login;
