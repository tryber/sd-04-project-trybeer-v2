import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { registerValidation, setLocalStorage } from '../../validation';
import api from '../../services/api';

import womanRegister from '../../assets/woman-register.svg';

import './styles.css';

const Register = () => {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [message, setMessage] = useState('');

  const checkRole = async ({ name, email, role }) => {
    // history.push(role === 'administrator' ? '/admin/orders' : '/products');
    setLocalStorage({ name, email, role });
    if (role === 'administrator') {
      history.push('/admin/orders');
    } else {
      history.push('/products');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post('/register', {
        userName,
        emailUser,
        password,
        isSeller,
      });
      if (result.data.message) {
        setMessage(result.data.message);
      } else {
        checkRole(result.data);
      }
    } catch (error) {
      // alert(error.message);
      // throw new Error();
    }
  };

  const ableRegisterButton = () => (
    <div className="btn-div">
      <Link to="/" className="disable-link">
        <button
          data-testid="signup-btn"
          type="button"
          className="btn-cadastrar"
          disabled={ registerValidation(userName, emailUser, password) }
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
      </Link>
    </div>
  );

  return (
    <article className="page-registro">
      <img src={ womanRegister } alt="Woman drinking" className="logo-trybeer" />

      <form className="form-registro">
        <label className="input-labels" htmlFor="input-name">
          Nome
          <input
            id="input-name"
            onChange={ (e) => setUserName(e.target.value) }
            type="text"
            data-testid="signup-name"
            className="input-registro"
            minLength="12"
            title="Nome com no mínimo 12 caracteres sem números ou caracteres especiais"
            required
          />
        </label>

        <label className="input-labels" htmlFor="input-email">
          Email
          <input
            id="input-email"
            type="email"
            onChange={ (e) => setEmailUser(e.target.value) }
            data-testid="signup-email"
            className="input-registro"
            title="Endereço de e-mail inválido, formato recomendado <nome>@<domínio>"
            required
          />
        </label>

        <label className="input-labels" htmlFor="input-password">
          Password
          <input
            onChange={ (e) => setPassword(e.target.value) }
            type="password"
            id="input-password"
            data-testid="signup-password"
            className="input-registro"
            minLength="6"
            // pattern="[0-9]*"
            title="Sua senha deve ter no mínimo 6 caracteres, sendo TODOS numéricos."
            inputMode="numeric"
            required
          />
        </label>

        <div className="seller-checkbox-div">
          <label htmlFor="CheckSalesman">
            <span className="checkbox-text">
              <input
                type="checkbox"
                onChange={ () => setIsSeller(!isSeller) }
                data-testid="signup-seller"
                className="seller-checkbox"
                value={ isSeller }
              />
              Quero Vender
            </span>
          </label>
        </div>
        {ableRegisterButton()}
      </form>
      <span>{message}</span>
    </article>
  );
};

export default Register;
