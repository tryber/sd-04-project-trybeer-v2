import React, {
  useState, useEffect, useRef,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { validateLogin } from '../../services/validate';
import { forgotPassword } from '../../services/TrybeerApi';
import { logout } from '../../images';

function ForgotPasswordForm() {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const [IsLoggingOut, setIsLoggingOut] = useState(false);

  const handleInput = ({ target: { value } }) => setEmail(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await forgotPassword(email);
      console.log(data);
      history.push(`/resetPassword`);
    } catch (err) {
      setMessage(err.response.data.erro);
    }
  };

  const update = useRef(false);
  useEffect(() => {
    if (update.current) {
      const { error } = validateLogin(email, "1234567");
      if (error) {
        setCanLogin(false);
        return setMessage(error.message);
      }
      setMessage();
      return setCanLogin(true);
    }
    update.current = true;
    return undefined;
  }, [email]);

  return (
    <form onSubmit={ handleSubmit } className="form">
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
      <button type="submit" data-testid="signin-btn" disabled={ !canLogin }>redefinir senha</button>     
      <span>{ message }</span>
      {IsLoggingOut && <img src={ logout } alt="Homer Sad" className="homer-sad" /> }
    </form>
  );
}

export default ForgotPasswordForm;
