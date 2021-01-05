import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

const NavBar = ({
  navStyle,
  setNavStyle,
  setTransitionMenuHambuger,
  setNavDisplay,
  navDisplay,
  navDisplayTrue,
}) => {
  const history = useHistory();
  return (
    <button
      className="side-menu-container"
      type="button"
      style={ navStyle }
      onClick={ () => {
        navDisplayTrue(setTransitionMenuHambuger, setNavStyle, setNavDisplay, navDisplay);
      } }
      onKeyDown={ () => {
        navDisplayTrue(setTransitionMenuHambuger, setNavStyle, setNavDisplay, navDisplay);
      } }
    >
      <ul className="side-menu-container-list-container">
        <li>
          <Link data-testid="side-menu-item-products" to="/products">
            Produtos
          </Link>
        </li>
        <li>
          <Link data-testid="side-menu-item-my-orders" to="/orders">
            Meus pedidos
          </Link>
        </li>
        <li>
          <Link data-testid="side-menu-item-my-profile" to="/profile">
            Meu Perfil
          </Link>
        </li>
        <li>
          <button
            data-testid="side-menu-item-logout"
            type="button"
            onClick={ () => {
              localStorage.removeItem('user');
              history.push('/login');
            } }
            className="logout-button"
          >
            Sair
          </button>
        </li>
      </ul>
    </button>
  );
};

NavBar.propTypes = {
  navStyle: PropTypes.shape({
    animationName: PropTypes.string.isRequired,
  }).isRequired,
  setNavStyle: PropTypes.func.isRequired,
  setTransitionMenuHambuger: PropTypes.func.isRequired,
  setNavDisplay: PropTypes.func.isRequired,
  navDisplay: PropTypes.bool.isRequired,
  navDisplayTrue: PropTypes.func.isRequired,
};

// /login

export default NavBar;
