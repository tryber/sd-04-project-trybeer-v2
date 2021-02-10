import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../services/api';
import '../app.sass';
import './login.css';

const beer = require('../images/beer2.webp');

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUser, setAdminUser] = useState(false);
  const [clientUser, setClientUser] = useState(false);

  const validateEmail = (validEmail) =>
    validEmail.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i);

  const seis = 6;
  const validatePassword = (validPassword) => validPassword.length >= seis;

  const login = async (event) => {
    event.preventDefault();
    await api
      .post('/login', {
        email,
        password,
      })
      .then((response) => {
        const { token, user } = response.data;
        const { name, email: userEmail, role } = user;
        const userData = {
          name,
          userEmail,
          token,
          role,
        };
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(userData));
        return user.role === 'administrator'
          ? setAdminUser(true)
          : setClientUser(true);
      });
  };

  return (
    <div className="main-container-login hero is-warning is-bold">
      <div>

      </div>

      <form onSubmit={(event) => login(event)}>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              className="input"
              id="email"
              data-testid="email-input"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
        </div>

        <div class="field">
          <input
            className="input is-large"
            data-testid="password-input"
            name="password"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="buttons">
          <button
            className="button is-success is-rounded"
            type="submit"
            disabled={!(validateEmail(email) && validatePassword(password))}
            data-testid="signin-btn">
            ENTRAR
          </button>

          <div className="no-account">
            <Link
              to="/register"
              style={{ color: 'white', textDecoration: 'none' }}>
              <button
                className="button is-link is-rounded"
                type="button"
                data-testid="no-account-btn"
                onClick={() => <Redirect to="/register" />}>
                Ainda não tenho conta
              </button>
            </Link>
          </div>
        </div>
      </form>

      {adminUser && <Redirect to="/admin/orders" />}
      {clientUser && <Redirect to="/products" />}
    </div>
  );
}

export default Login;
