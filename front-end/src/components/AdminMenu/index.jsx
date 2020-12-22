import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const index = () => (
  <header className={ styles.header }>
    <nav className={ styles.navbar }>
      <Link
        to="/admin/orders"
        className={ styles.navLink }
        data-testid="side-menu-item-orders"
      >
        Pedidos
      </Link>
      <Link
        to="/admin/profile"
        className={ styles.navLink }
        data-testid="side-menu-item-profile"
      >
        Perfil
      </Link>
      <Link
        to="/login"
        className={ styles.navLink }
        data-testid="side-menu-item-logout"
      >
        Sair
      </Link>
    </nav>
    <h1 className={ styles.topTitle }>TryBeer</h1>
  </header>
);

export default index;
