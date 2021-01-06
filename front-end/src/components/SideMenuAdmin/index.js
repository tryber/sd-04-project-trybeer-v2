import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const handlePath = (history, pathName) => {
  if (pathName == null) {
    localStorage.removeItem('user');
    return history.push('/login');
  }
  return history.push(`/${pathName}`);
};

function SideMenuAdmin() {
  const history = useHistory();
  return (
    <div className="admin-side-bar-container">
      <span className="admin-app-side-title">
        TryBeer
      </span>
      <button
        data-testid="side-menu-item-orders"
        type="button"
        className="admin-side-button"
        onClick={ () => handlePath(history, 'admin/orders') }
      >
        Pedidos
      </button>
      <button
        data-testid="side-menu-item-profile"
        type="button"
        className="admin-side-button"
        onClick={ () => handlePath(history, 'admin/profile') }
      >
        Perfil
      </button>
      <button
        data-testid="side-menu-item-logout"
        type="button"
        className="admin-side-button botao-sair"
        onClick={ () => handlePath(history, null) }
      >
        Sair
      </button>
    </div>
  );
}

export default SideMenuAdmin;
