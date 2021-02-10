import React, { useState } from 'react';
import { validateName, validateEmail, validatePassword } from '../utils/inputValidations';
import api from '../services/api';
import '../app.sass';
import './login.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [message, setMessage] = useState('');

  // Conferir URL e metódo
  const redirect = () => {
    if (checkbox) {
      return window.location.replace('http://localhost:3000/admin/orders');
    }
    return window.location.replace('http://localhost:3000/products');
  };

  // not try

  const register = async (event) => {
    event.preventDefault();
    await api
      .post('/register', {
        name,
        email,
        password,
        checkbox,
      })
      .then(() => redirect())
      .catch((e) => setMessage(e.response.data.message));
  };

  return (
    <div className="main-container-login hero is-warning is-bold">
      <form onSubmit={ (event) => register(event) }>
        <div className="container">
          <div >
            <label htmlFor="name">
              Nome
              <input
                className="form-control"
                data-testid="signup-name"
                placeholder="name"
                name="name"
                type="text"
                required
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              />
            </label>
          </div>
        </div>

        <div className="container">
          <div className="col-sm-12">
            <label htmlFor="email">
              Email
              <input
                className="form-control"
                data-testid="signup-email"
                name="email"
                placeholder="email"
                type="email"
                required
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              />
            </label>
          </div>
        </div>

        <div className="container">
          <div>
            <label htmlFor="password">
              Password
              <input
                className="form-control"
                data-testid="signup-password"
                name="password"
                placeholder="passwrod"
                type="password"
                required
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </label>
          </div>
        </div>

        <div className="custom-control custom-checkbox">
          <div className="container">
            <label htmlFor="checkbox-i" className="custom-control-label">
              Quero Vender{"   "}   
              <input
                className="custom-control-input"
                data-testid="signup-seller"
                name="checkbox"
                id="checkbox-i"
                type="checkbox"
                onChange={ (e) => setCheckbox(e.target.checked) }
              />
            </label>
          </div>
        </div>

        <button
          className="button is-success is-rounded"
          type="submit"
          disabled={ !(validateName(name) && validateEmail(email) && validatePassword(password)) }
          data-testid="signup-btn"
        >
          Cadastrar
        </button>
      </form>
      {message}
    </div>
  );
}

export default Register;
