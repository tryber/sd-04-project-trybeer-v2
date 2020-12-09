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

  const checkName = (name) => {
    const regexName = /^[a-z\s]*$/i;
    return regexName.test(name) && name.length >= 12 ? true : false;
  };

  const checkEmail = (email) => {
    const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    return regexEmail.test(email);
  };

  const role = checked ? 'administrator' : 'client';

  const registerUser = () => {
    axios
      .post('http://localhost:3001/users', { name, email, password, role })
      .then((_res) => setRedirect(true))
      .catch((_error) => setMessage('E-mail already in database.'));
  };

  const createToken = () =>
    axios
      .post('http://localhost:3001/login', { email, password })
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((error) => console.log(error));

  if (token !== '') {
    const objUser = { name, email, token, role };
    localStorage.setItem('user', JSON.stringify(objUser));
  }

  if (role === 'administrator' && redirect)
    return <Redirect to="/admin/orders" />;

  if (role === 'client' && redirect) {
    return <Redirect to="/products" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createToken();

    registerUser();
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          data-testid="signup-name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          data-testid="signup-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          data-testid="signup-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="seller">Quero Vender</label>
        <input
          type="checkbox"
          id="seller"
          data-testid="signup-seller"
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
        />
        <button
          type="submit"
          data-testid="signup-btn"
          disabled={
            !checkEmail(email) || !checkName(name) || password.length < 6
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
