import React from 'react';
import { Link } from 'react-router-dom';

const MenuAdmin = () => {
  const cleanLocal = () => {
    localStorage.clear();
  };

  return (
    <header>
      <h1>TryBeer</h1>
      <div>
        <Link to="/admin/orders">
          <button data-testid="side-menu-item-orders" type="button">
            Pedidos
          </button>
        </Link>
        <hr />
        <Link to="/admin/profile">
          <button data-testid="side-menu-item-profile" type="button">
            Perfil
          </button>
        </Link>
        <hr />
        <Link to="/login">
          <button
            data-testid="side-menu-item-logout"
            type="button"
            onClick={cleanLocal}
          >
            Sair
          </button>
        </Link>
        <hr />
      </div>
    </header>
  );
};

export default MenuAdmin;
