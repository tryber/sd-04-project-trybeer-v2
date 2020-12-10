import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const [token, setToken] = useState('');

  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const checkName = (checkedName) => {
    const NUM = 12;
    const regexName = /^[a-z\s]*$/i;
    return regexName.test(checkedName) && checkedName.length >= NUM;
  };

  const checkEmail = (checkedEmail) => {
    const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    return regexEmail.test(checkedEmail);
  };

  const role = checked ? 'administrator' : 'client';

  const registerUser = () => {
    axios
      .post('http://localhost:3001/users', {
        name,
        email,
        password,
        role,
      })
      .then(() => setRedirect(true))
      .catch(() => setMessage('E-mail already in database.'));
  };

  const createToken = () => axios
    .post('http://localhost:3001/login', { email, password })
    .then((res) => {
      setToken(res.data.token);
    });

  if (token !== '') {
    const objUser = {
      name,
      email,
      token,
      role,
    };
    localStorage.setItem('user', JSON.stringify(objUser));
  }

  if (role === 'administrator' && redirect) {
    return <Redirect to="/admin/orders" />;
  }

  if (role === 'client' && redirect) {
    return <Redirect to="/products" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createToken();

    registerUser();
  };

  const NUM = 6;

  return (
    <div>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            data-testid="signup-name"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="signup-email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            data-testid="signup-password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <label htmlFor="seller">
          Quero Vender
          <input
            type="checkbox"
            id="seller"
            data-testid="signup-seller"
            defaultChecked={ checked }
            onChange={ () => setChecked(!checked) }
          />
        </label>
        <button
          type="submit"
          data-testid="signup-btn"
          disabled={
            !checkEmail(email) || !checkName(name) || password.length < NUM
          }
        >
          Cadastrar
        </button>
      </form>
      {message !== '' && <p>{message}</p>}
    </div>
  );
};

export default connect(null, null)(Register);
