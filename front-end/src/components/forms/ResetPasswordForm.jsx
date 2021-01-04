import React, {
  useState, useEffect, useRef,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { validateLogin } from '../../services/validate';
import { resetPassword } from '../../services/TrybeerApi';
import { logout } from '../../images';

function ResetPasswordForm() {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const [IsLoggingOut, setIsLoggingOut] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', token: '' });

  const handleInput = ({ target: { name, value } }) => setForm({ ...form, [name]: value});

  const { email, password, token } = form;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await resetPassword(email, token, password);
      console.log(data);
      history.push(`/login`);
    } catch (err) {
      setMessage(err.response.data.erro);
    }
  };

  const update = useRef(false);
  useEffect(() => {
    if (update.current) {
      const { error } = validateLogin(email, password);
      if (error) {
        setCanLogin(false);
        return setMessage(error.message);
      }
      setMessage();
      return setCanLogin(true);
    }
    update.current = true;
    return undefined;
  }, [form]);

  return (
    <form onSubmit={ handleSubmit } className="form">
      <label htmlFor="token">
        token:
        <input
          type="text"
          name="token"
          value={ token }
          onChange={ handleInput }
          data-testid="token-input"
          required
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          name="email"
          value={ email }
          onChange={ handleInput }
          data-testid="email-input"
          required
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ handleInput }
          data-testid="password-input"
          required
        />
      </label>
      <button type="submit" data-testid="signin-btn" disabled={ !canLogin }>resetar senha</button>     
      <span>{ message }</span>
      {IsLoggingOut && <img src={ logout } alt="Homer Sad" className="homer-sad" /> }
    </form>
  );
}

export default ResetPasswordForm;
