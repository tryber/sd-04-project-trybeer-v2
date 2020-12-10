import React, { useState, useEffect, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { formValidate } from '../../services/validate';
import { postRegister } from '../../services/TrybeerApi';
import getDuffed from '../../images/getDuffed.png';

const RegisterForm = () => {
  const [form, setForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: null,
      email: null,
      password: null,
      role: false,
      error: null,
      redirect: null,
    },
  );

  const [disableButton, setDisableButton] = useState(true);

  const {
    name,
    email,
    password,
    role,
    error,
    redirect,
  } = form;

  const sendRequestApi = async () => {
    const definedRole = role ? 'administrator' : 'client';
    const response = await postRegister(name, email, password, definedRole);

    // response.err ? setForm({ ...form, error: response.err }) : setForm({ ...form, error: null });
    if (response.data.err) return setForm({ error: response.data.err });

    const { data: { token } } = response;
    localStorage.user = JSON.stringify({
      name, email, token, role: definedRole,
    });

    return setForm({ error: null, redirect: definedRole });
  };

  const handleValidForm = async () => {
    const validation = formValidate(form);
    if (validation === true) sendRequestApi();
  };

  const handleChangeInput = (event) => {
    if (event.target.name === 'role') return setForm({ role: !role });
    const { name: inputName, value } = event.target;
    setForm({ [inputName]: value });
    return true;
  };

  const handleDisableButton = (param) => {
    const validation = formValidate(param);
    // validation === true ? setDisableButton(false) : setDisableButton(true);
    if (validation === true) return setDisableButton(false);
    return setDisableButton(true);
  };

  useEffect(() => {
    handleDisableButton({ name, email, password });
  }, [name, email, password, redirect]);

  if (redirect) return (redirect === 'administrator' ? <Redirect to="/admin/orders" /> : <Redirect to="/products" />);

  return (
    <form className="form">
      <img src={ getDuffed } alt="get duffed" className="get-duffed" />
      <label htmlFor="userName">
        Nome
        <input
          type="text"
          name="name"
          id="userName"
          data-testid="signup-name"
          onChange={ handleChangeInput }
        />
      </label>
      <label htmlFor="userEmail">
        Email
        <input
          type="email"
          name="email"
          id="userEmail"
          data-testid="signup-email"
          onChange={ handleChangeInput }
        />
      </label>
      <label htmlFor="userPassword">
        Password
        <input
          className="input-register"
          type="password"
          name="password"
          id="userPassword"
          minLength="6"
          data-testid="signup-password"
          onChange={ handleChangeInput }
        />
      </label>
      <div className="form-checkbox">
        <label htmlFor="userSeller">
          <input
            type="checkbox"
            name="role"
            id="userSeller"
            data-testid="signup-seller"
            onChange={ handleChangeInput }
          />
          Quero Vender
        </label>
      </div>
      <button
        onClick={ handleValidForm }
        type="button"
        disabled={ disableButton }
        data-testid="signup-btn"
      >
        Cadastrar
      </button>
      <Link to="/login">Já tenho conta</Link>
      {error && <span>{ error }</span> }
    </form>
  );
};

export default RegisterForm;
