import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Menu = ({ title }) => {
  const [menu, setMenu] = useState(false);

  const cleanLocal = () => {
    localStorage.clear();
  };

  const sideMenu = () => {
    return (
      <div className="side-menu-container">
        <Link to="/products">
          <button data-testid="side-menu-item-products" type="button">
            Produtos
          </button>
        </Link>
        <hr />
        <Link to="/orders">
          <button data-testid="side-menu-item-my-orders" type="button">
            Meus pedidos
          </button>
        </Link>
        <hr />
        <Link to="/profile">
          <button data-testid="side-menu-item-my-profile" type="button">
            Meu Perfil
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
    );
  };

  return (
    <header>
      <button
        data-testid="top-hamburguer"
        type="button"
        onClick={() => setMenu(!menu)}
      >
        Icone
      </button>
      {menu && sideMenu()}
      <h1 data-testid="top-title">{title}</h1>
    </header>
  );
};

export default connect(null, null)(Menu);
