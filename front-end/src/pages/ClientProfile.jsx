import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Menu from '../components/Menu';

const ClientProfile = () => {
  const [name_, setName] = useState('');
  const [email_, setEmail] = useState('');

  const [name1, setName1] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { name, email } = user;
    setName(name);
    setName1(name);
    setEmail(email);
  }, []);

  const editUser = () => {
    axios
      .put('http://localhost:3001/users', { name_, email_ })
      .then(() => setMessage('Atualização concluída com sucesso'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser();
  };

  return (
    <div>
      <Menu title="Meu perfil" />
      <form onSubmit={ (e) => handleSubmit(e) }>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            data-testid="profile-name-input"
            value={ name_ }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="profile-email-input"
            readOnly
            value={ email_ }
          />
        </label>
        <button
          type="submit"
          data-testid="profile-save-btn"
          // disabled={ name1 === name ? true : false }
          disabled={ name1 === name_ }
        >
          Salvar
        </button>
      </form>
      {message !== '' && <p>{message}</p>}
    </div>
  );
};

export default connect(null, null)(ClientProfile);
