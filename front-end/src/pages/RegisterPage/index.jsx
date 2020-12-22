import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { setLS } from '../../utils';
import styles from './index.module.css';
import Menu from '../../components/Menu';

const createUserAPI = async (name, email, password, role) => api
  .registerUserAPI(name, email, password, role)
  .then((data) => data)
  .catch((error) => error);

const Register = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    role: 'cliente',
    box: false,
    erro: null,
  });

  const {
    name, email, password, role, box, erro,
  } = state;

  const checkName = (nome) => nome.match(/^([a-zA-Z\s]){12,100}$/);
  const checkEmail = (mail) => mail.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

  const six = 6;
  const checkSenha = (senha) => senha.length >= six;

  const handleName = (nome) => setState({ ...state, name: nome });
  const handleEmail = (carta) => setState({ ...state, email: carta });
  const handlePassword = (valor) => setState({ ...state, password: valor });
  const handleBox = () => setState({ ...state, box: true });

  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const createUser = await createUserAPI(name, email, password, role);
      const apiResponse = createUser;

      const forbidden = 403;

      if (apiResponse.status === forbidden) {
        return setState({ ...state, erro: apiResponse.data.message });
      }

      setLS('user', apiResponse.data);
      return history.push(box ? '/admin/orders' : '/products');
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  return (
    <div className={ styles.pageRegister }>
      <Menu nomeTela="Cadastre-se" />
      <form className={ styles.formRegister } method="POST" onSubmit={ handleSubmit }>
        <label className="inputLabel" htmlFor="name">
          Nome
          <br />
          <input
            className={ styles.inputRegister }
            data-testid="signup-name"
            type="text"
            name="name"
            id="name"
            minLength={ 12 }
            maxLength={ 100 }
            onChange={ (e) => handleName(e.target.value) }
            value={ name }
            required
          />
        </label>
        <label className="inputLabel" htmlFor="email">
          Email
          <br />
          <input
            className={ styles.inputRegister }
            data-testid="signup-email"
            type="email"
            name="email"
            id="email"
            onChange={ (e) => handleEmail(e.target.value) }
            value={ email }
            required
          />
        </label>
        <label className="inputLabel" htmlFor="password">
          Password
          <br />
          <input
            className={ styles.inputRegister }
            data-testid="signup-password"
            type="password"
            name="password"
            id="password"
            onChange={ (e) => handlePassword(e.target.value) }
            value={ password }
            required
          />
        </label>
        <label className={ styles.wantToSell } htmlFor="seller">
          <input
            className={ styles.checkboxInput }
            data-testid="signup-seller"
            type="checkbox"
            name="seller"
            id="seller"
            onChange={ (e) => handleBox(e.target.checked) }
            value={ box }
          />
          <span>Quero Vender</span>
        </label>
        {erro && <span>{erro}</span>}
        <input
          className="buttonMain"
          type="submit"
          value="Cadastrar"
          disabled={ !(checkEmail(email) && checkName(name) && checkSenha(password)) }
          data-testid="signup-btn"
        />
      </form>
    </div>
  );
};

export default Register;
