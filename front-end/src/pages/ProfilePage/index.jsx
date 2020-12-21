import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import { getLS } from '../../utils';
import styles from './index.module.css';
import Menu from '../../components/Menu';
import InputForm from '../../components/InputForm';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setEmail(getLS('user').email);
    setName(getLS('user').name);
  }, []);

  const checkNameChange = () => (getLS('user').name === name ? true : false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdated(!updated);

    await api.updateUserAPI(name, email);
  };

  if (!getLS('user').email) return <Redirect to="/login" />;
  return (
    <div className={styles.profileContainer}>
      <Menu nomeTela="Meu perfil" />
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <div className={styles.profileFieldsContainer}>
          <InputForm
            name="name"
            handleChange={({ target }) => setName(target.value)}
            label="Nome"
            value={name}
            type="text"
            dataTestId="profile-name-input"
          />
          <InputForm
            name="Email"
            label="Email"
            value={email}
            type="text"
            dataTestId="profile-email-input"
            readOnly
          />
        </div>
        <div className={styles.profileFieldsContainer}>
          <button
            data-testid="profile-save-btn"
            type="submit"
            className="buttonMain"
            disabled={checkNameChange()}
          >
            Salvar
          </button>
          {updated && <span>Atualização concluída com sucesso</span>}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
