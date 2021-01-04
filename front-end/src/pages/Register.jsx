import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { formValidate } from '../services/validate';
import { postRegister } from '../services/TrybeerApi';

const Register = () => {
  const [form, setForm] = useState({
    name: null,
    email: null,
    password: null,
    role: false,
    error: null,
    redirect: null,
  });

  const [disableButton, setDisableButton] = useState(true);

  const {
    name,
    email,
    password,
    role,
    error,
    redirect,
  } = form;

  const sendRequestApi = async (userData) => {
    const {
      name: userName,
      email: userEmail,
      password: userPass,
      role: userRole,
    } = userData;

    const definedRole = userRole ? 'administrator' : 'client';
    const response = await postRegister(userName, userEmail, userPass, definedRole);

    // response.err ? setForm({ ...form, error: response.err }) : setForm({ ...form, error: null });
    if (response.data.err) return setForm({ ...form, error: response.data.err });

    const { token, id } = response;

    localStorage.user = JSON.stringify({
      id, name, email, token, role: definedRole,
    });

    if (definedRole === 'administrator') {
      setForm({ ...form, redirect: 'administrator' });
    } else setForm({ ...form, redirect: 'client' });

    return setForm({ ...form, error: null });
  };

  const handleValidForm = async (param) => {
    const validation = formValidate(param);
    if (validation === true) sendRequestApi(param);
  };

  const handleChangeInput = (event) => {
    if (event === 'role') return setForm({ ...form, role: !role });
    const { name: inputName, value } = event.target;
    return setForm({ ...form, [inputName]: value });
  };

  const handleDisableButton = (param) => {
    const validation = formValidate(param);
    // validation === true ? setDisableButton(false) : setDisableButton(true);
    if (validation === true) return setDisableButton(false);
    return setDisableButton(true);
  };

  useEffect(() => {
    const formToValide = `{"name":"${name}", "email":"${email}", "password":"${password}"}`;
    handleDisableButton(JSON.parse(formToValide));
  }, [name, email, password, redirect]);

  if (redirect) return (redirect === 'administrator' ? <Redirect to="/admin/orders" /> : <Redirect to="/products" />);

  return (
    <form>
      <label htmlFor="userName">
        Nome
        <input
          type="text"
          name="name"
          id="userName"
          data-testid="signup-name"
          onChange={ (event) => handleChangeInput(event) }
        />
      </label>
      <label htmlFor="userEmail">
        Email
        <input
          type="email"
          name="email"
          id="userEmail"
          data-testid="signup-email"
          onChange={ (event) => handleChangeInput(event) }
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
          onChange={ (event) => handleChangeInput(event) }
        />
      </label>
      <label htmlFor="userSeller">
        Quero Vender
        <input
          type="checkbox"
          name="role"
          id="userSeller"
          data-testid="signup-seller"
          onChange={ () => handleChangeInput('role') }
        />
      </label>
      <button
        onClick={ () => handleValidForm(form) }
        type="button"
        disabled={ disableButton }
        data-testid="signup-btn"
      >
        Cadastrar
      </button>
      {error && <span>{error}</span>}
    </form>
  );
};

export default Register;
