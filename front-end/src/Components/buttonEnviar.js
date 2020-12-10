import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Notification } from 'rbx';

import api from '../services/userApi';

const ButtonEnviar = ({ email, password, isDisabled = true }) => {
  const [message, setMessage] = useState('');

  const history = useHistory();

  const validaLogin = () => {
    api.login(email, password).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.role === 'administrator') {
        history.push('/admin/orders');
      } else history.push('/products');
    })
      .catch(() => setMessage('Email nao encontrado'));
  };

  return (
    <div>
      { message ? <Notification color="danger">{message}</Notification> : ''}

      <Button
        type="Button"
        data-testid="signin-btn"
        disabled={ isDisabled }
        onClick={ () => validaLogin() }
      >
        ENTRAR
      </Button>
    </div>
  );
};

ButtonEnviar.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default ButtonEnviar;
