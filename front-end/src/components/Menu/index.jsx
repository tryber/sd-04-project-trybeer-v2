import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useOnClickOutside from '../../hooks';
import Burger from '../Burger';
import StyledMenu from './style';
import styles from './index.module.css';

const Menu = ({ nomeTela }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <header className={styles.header} ref={node}>
      <Burger open={open} setOpen={setOpen} />
      <StyledMenu open={open} className="side-menu-container">
        <Link
          to="/products"
          className={styles.navLink}
          data-testid="side-menu-item-products"
        >
          Produtos
        </Link>
        <Link
          to="/orders"
          className={styles.navLink}
          data-testid="side-menu-item-my-orders"
        >
          Meus pedidos
        </Link>
        <Link
          to="/profile"
          className={styles.navLink}
          data-testid="side-menu-item-my-profile"
        >
          Meu Perfil
        </Link>
        <Link
          to="/login"
          className={styles.navLink}
          data-testid="side-menu-item-logout"
        >
          Sair
        </Link>
      </StyledMenu>
      <h1 className={styles.topTitle} data-testid="top-title">
        {nomeTela}
      </h1>
    </header>
  );
};

Menu.propTypes = {
  nomeTela: PropTypes.string.isRequired,
};

export default Menu;
