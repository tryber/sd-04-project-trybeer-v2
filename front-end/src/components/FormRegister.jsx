import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userSignup } from '../store/ducks/user';

const five = 5;

const FormRegister = () => {
  // Set all local Action/Reducers
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    admin: false,
  });

  const [inputsValid, setInputsValid] = useState(true);

  const dispatch = useDispatch();

  // Each time user is updated password and email are checked if are valid
  useEffect(() => {
    const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    const regexName = /^[a-zA-Z ]{12,}$/;

    if (user.password.length > five && regexEmail.test(user.email) && regexName.test(user.name)) {
      setInputsValid(false);
    } else {
      setInputsValid(true);
    }
  }, [user]);

  const handleClick = () => {
    dispatch(userSignup(user));
  };
  // const handleClick = () => dispatch(userSignup(user))

  return (
    <div>
      <form className="formContainer">
        <label htmlFor="name">
          Nome
          <input
            name="name"
            type="text"
            data-testid="signup-name"
            placeholder="Digit seu nome"
            value={ user.name }
            onChange={ (event) => setUser({ ...user, [event.target.name]: event.target.value }) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            data-testid="signup-email"
            placeholder="Digit seu email"
            value={ user.email }
            onChange={ (event) => setUser({ ...user, [event.target.name]: event.target.value }) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            data-testid="signup-password"
            placeholder="Digit seu password"
            value={ user.password }
            onChange={ (event) => setUser({ ...user, [event.target.name]: event.target.value }) }
          />
        </label>
        <label htmlFor="admin">
          Quero Vender
          <input
            data-testid="signup-seller"
            name="admin"
            type="checkbox"
            checked={ user.admin }
            onChange={ (event) => setUser({ ...user, [event.target.name]: !user.admin }) }
          />
        </label>
        <button data-testid="signup-btn" type="button" onClick={ handleClick } disabled={ inputsValid }>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
