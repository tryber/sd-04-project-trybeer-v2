import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setName] = useState('');
  const [userRole, setRole] = useState('');
  const [users, setUsers] = useState(null);
  const [token, setToken] = useState('');
  const [redirect, setRedirect] = useState(false);

  const SEIS = 6;

  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => { throw new Error(error.message); });
  }, []);

  const validEmail = (userEmail) => /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(userEmail);

  const createToken = () => axios
    .post('http://localhost:3001/login', { email, password })
    .then((res) => {
      setToken(res.data.token);
      setRedirect(true);
    })
    .catch((error) => { throw new Error(error.message); });

  if (token !== '') {
    const objUser = {
      name: userName, email, token, role: userRole,
    };
    localStorage.setItem('user', JSON.stringify(objUser));
  }

  if (userRole === 'administrator' && redirect) return <Redirect to="/admin/orders" />;

  if (userRole === 'client' && redirect) {
    return <Redirect to="/products" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((item) => item.email === email);
    if (user) {
      const { name, role } = user;
      setName(name);
      setRole(role);
    }
    createToken();
  };

  return (
    <div>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="submit"
          data-testid="signin-btn"
          disabled={ !validEmail(email) || password.length < SEIS }
        >
          ENTRAR
        </button>
      </form>
      <Link to="/register">
        <button type="button" data-testid="no-account-btn">
          Ainda não tenho conta
        </button>
      </Link>
    </div>
  );
};
export default connect(null, null)(Login);
