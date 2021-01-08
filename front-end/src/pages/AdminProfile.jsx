import React from 'react';
import Header from '../components/Header';
import { Beer } from '../images/index';
import '../css/profile.css';

function AdminProfile() {
  const { name, email } = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="profile page">
      <Header>Perfil</Header>
      <div className="admin-profile-page page-content">
        <h1>Perfil</h1>
        <span data-testid="profile-name">
          Nome:
          { name }
        </span>
        <span data-testid="profile-email">
          Email:
          { email }
        </span>
      </div>
      <img src={ Beer } alt="Duff beer" className="duff-beer" />
    </div>
  );
}

export default AdminProfile;
