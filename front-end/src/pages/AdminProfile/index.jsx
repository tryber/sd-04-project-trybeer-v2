import React from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../../components/AdminMenu';
import { getLS } from '../../utils/index';
import styles from './index.module.css';

function AdminProfile() {
  const user = getLS('user');

  if (user === null || user.role !== 'administrator')
    return <Redirect to="/login" />;
  return (
    <div>
      <Menu />
      <div className={styles.pageContainer}>
        <h2>Perfil</h2>
        <p data-testid="profile-name">Nome: {user.name}</p>
        <p data-testid="profile-email">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default AdminProfile;
