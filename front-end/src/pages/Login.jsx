import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../services/api';
const beer = require('../images/beer2.webp');

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUser, setAdminUser] = useState(false);
  const [clientUser, setClientUser] = useState(false);

  const validateEmail = (email) =>
    email.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i);

  const validatePassword = (password) => password.length >= 6;

  const login = async (event) => {
    event.preventDefault();
    await api
      .post('/login', {
        email,
        password,
      })
      .then((response) => {
        const { token, user } = response.data;
        const { name, email, role } = user;
        const userData = { name, email, token, role };
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(userData));
        return user.role === 'administrator'
          ? setAdminUser(true)
          : setClientUser(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="main-container">
      <img src={beer} className="beer-img" />
      <h2>Login Page</h2>
      <div>
        <form onSubmit={(event) => login(event)}>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                data-testid="email-input"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-8">
              <label htmlFor="email">Password</label>
              <input
                className="form-control"
                data-testid="password-input"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="bottom-btn">
              <div className="col-sm-12">
                <button
                  type="submit"
                  disabled={!(validateEmail(email) && validatePassword(password))}
                  data-testid="signin-btn"
                  className="col-sm-3 btn btn-success"
                >
                  ENTRAR
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="no-account">
          <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
            <div
              data-testid="no-account-btn"
              onClick={() => <Redirect to="/register" />}
            >
              Ainda não tenho conta
          </div>
          </Link>
        </div>
      </div>

      {adminUser && <Redirect to="/admin/orders" />}
      {clientUser && <Redirect to="/products" />}
    </div>
  );
}

export default Login;
