import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { updateProfileValidation } from '../../validation';
import api from '../../services/api';
import profileIcon from '../../assets/profile-icon.svg';
import './styles.css';

// const getUser = async (name, email, setMessage) => {
//   try {
//     const { status } = await api.put(
//       { name, email },
//       { headers: { Authorization: JSON.parse(localStorage.getItem('user')).token } },
//     );
//     const statusOk = 200;
//     if (status === statusOk) { setMessage('Atualização concluída com sucesso') }
//   } catch (err) {
//     setMessage(err.message);
//   }
// };

const ClientProfile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [intialName, setInitialName] = useState(userName);

  useEffect(() => {
    const { name, userEmail: email } = JSON.parse(localStorage.getItem('user'));
    setUserName(name);
    setInitialName(name);
    setUserEmail(email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.put('/updateUser', { userName, userEmail });
    if (typeof data === 'string') {
      setMessage(data);
    }
  };

  return (
    <div className="container">
      <Header title="Meu perfil" />
      <div className="square">
        <h1 className="pageTitle">Meu Perfil</h1>
        <img src={ profileIcon } className="profile-icon" alt="Cheers Beer Icon" />
        <form onSubmit={ handleSubmit } className="form">
          <div className="form-group">
            <label htmlFor="name" className="label-text">
              Nome
              <input
                className="input-field-profile"
                placeholder="Nome Completo"
                type="text"
                data-testid="profile-name-input"
                value={ userName }
                onChange={ (e) => setUserName(e.target.value) }
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label-text">
              Email
              <input
                data-testid="profile-email-input"
                className="input-field-profile"
                placeholder="Email"
                type="text"
                value={ userEmail }
                readOnly
              />
            </label>
          </div>
          <div className="div_btn">
            <button
              disabled={ updateProfileValidation(userName) || intialName === userName }
              type="submit"
              data-testid="profile-save-btn"
              className="save-button-profile"
            >
              Salvar
            </button>
          </div>
        </form>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ClientProfile;
