import React, { useState } from 'react';
import { putUpdate } from '../services/TrybeerApi';
import Header from '../components/Header';
import { HomerProfile } from '../images/index';
import '../css/profile.css';

function UserProfile() {
  const { name, email } = JSON.parse(localStorage.getItem('user') || '{}');
  const [userName, setUserName] = useState(name);
  const [message, setMessage] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    const update = await putUpdate(userName, email);
    setMessage(update.data.message);
  };

  return (
    <>
      <Header>Meu perfil</Header>

      <div className="user-profile-page">
        <img src={ HomerProfile } alt="homer profile" />
        <form onSubmit={ handleForm } className="profile form form-style page-content">
          <label htmlFor="name">
            Name:
            <input
              data-testid="profile-name-input"
              type="text"
              name="name"
              value={ userName }
              onChange={ (e) => {
                setUserName(e.target.value);
              } }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="profile-email-input"
              type="text"
              name="email"
              value={ email }
              readOnly
            />
          </label>

          <button
            className="btn-finish"
            data-testid="profile-save-btn"
            type="submit"
            disabled={ userName === name }
          >
            Salvar
          </button>
          <span>{ message }</span>
        </form>
      </div>

    </>
  );
}

export default UserProfile;
