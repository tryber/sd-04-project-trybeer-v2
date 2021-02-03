import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../services/api';

const beer = require('../images/beer2.webp');

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUser, setAdminUser] = useState(false);
  const [clientUser, setClientUser] = useState(false);

  const validateEmail = (validEmail) => validEmail.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i);

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
        return user.role === 'administrator' ? setAdminUser(true) : setClientUser(true);
      });
  };

  return (
    <div className="main-container">
      {/* <img src={ beer } className="beer-img" alt="beer" /> */}
      <h2>Login Page</h2>
      <div>
        <form onSubmit={ (event) => login(event) }>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="email">
                Email
                <input
                  className="form-control"
                  id="email"
                  data-testid="email-input"
                  name="email"
                  type="email"
                  required
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-8">
              <label htmlFor="email">
                Password
                <input
                  className="form-control"
                  data-testid="password-input"
                  name="password"
                  type="password"
                  required
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                />
              </label>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="bottom-btn">
              <div className="col-sm-12">
                <button
                  type="submit"
                  disabled={ !(validateEmail(email) && validatePassword(password)) }
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
          <Link to="/register" style={ { color: 'white', textDecoration: 'none' } }>
            <button
              type="button"
              data-testid="no-account-btn"
              onClick={ () => <Redirect to="/register" /> }
            >
              Ainda não tenho conta
            </button>
          </Link>
        </div>
      </div>

      {adminUser && <Redirect to="/admin/orders" />}
      {clientUser && <Redirect to="/products" />}
    </div>
  );
}

export default Login;
