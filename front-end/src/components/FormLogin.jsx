import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { saveToLocalStorage } from '../services/localStorage';
import { userLogin } from '../store/ducks/user';
import './FormLogin.css';

const five = 5;

const FormLogin = () => {
  // Route to /Register
  const history = useHistory();
  const dispatch = useDispatch();

  // Set all local Action/Reducers
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [inputsValid, setInputsValid] = useState(true);

  function handleClick() {
    dispatch(userLogin(user.email, user.password)); // async
  }

  // Each time user is updated password and email are checked if are valid
  useEffect(() => {
    const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (user.password.length > five && regexEmail.test(user.email)) {
      setInputsValid(false);
    } else {
      setInputsValid(true);
    }
  }, [user]);

  return (
    <div className="globalContainer">
      <form className="formContainer">
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            data-testid="email-input"
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
            data-testid="password-input"
            placeholder="Digit seu password"
            value={ user.password }
            onChange={ (event) => setUser({ ...user, [event.target.name]: event.target.value }) }
          />
        </label>
        <button
          type="button"
          data-testid="signin-btn"
          disabled={ inputsValid }
          onClick={ handleClick }
        >
          ENTRAR
        </button>
      </form>
      <div>
        <button
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          {' '}
          Ainda não tenho conta
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
