import React, { useState } from 'react';
import { validateName, validateEmail, validatePassword } from '../utils/inputValidations';
import api from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [message, setMessage] = useState('');

  // Conferir URL e metódo.
  const redirect = () => {
    if (checkbox) {
      return window.location.replace('http://localhost:3000/admin/orders');
    }
    return window.location.replace('http://localhost:3000/products');
  };

  const register = async (event) => {
    event.preventDefault();
    await api.post('/register', {
      name,
      email,
      password,
      checkbox,
    })
      .then(() => redirect())
      .catch((e) => setMessage(e.response.data.message));


  };

  return (
    <div className="main-container">
      <h2>Register Page</h2>
      <form onSubmit={(event) => register(event)}>
        <div className="form-group">
          <div className="col-sm-12">
            <label htmlFor="name">Nome</label>
            <input
              className="form-control"
              data-testid="signup-name"
              placeholder="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-12">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              data-testid="signup-email"
              name="email"
              placeholder="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-12">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              data-testid="signup-password"
              name="password"
              placeholder="passwrod"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="custom-control custom-checkbox">
          <div className="col-sm-12">
            <label htmlFor="checkbox-i" className="custom-control-label">Quero Vender</label>
            <input
              className="custom-control-input"
              data-testid="signup-seller"
              name="checkbox"
              id="checkbox-i"
              type="checkbox"
              onChange={(e) => setCheckbox(e.target.checked)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!(validateName(name) && validateEmail(email) && validatePassword(password))}
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
