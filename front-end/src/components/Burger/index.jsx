import React from 'react';
import { bool, func } from 'prop-types';
import styles from './index.module.css';

const Burger = ({ open, setOpen }) => (
  <button
    type="button"
    open={ open }
    onClick={ () => setOpen(!open) }
    data-testid="top-hamburguer"
    className={ styles.btnBurger }
  >
    <div
      className={ `${styles.divBurger} ${
        open ? styles.divBurgerTopActive : styles.divBurgerTop
      }` }
    />
    <div
      className={ `${styles.divBurger} ${
        open ? styles.divBurgerMiddleActive : styles.divBurgerMiddle
      }` }
    />
    <div
      className={ `${styles.divBurger} ${
        open ? styles.divBurgerBottomActive : styles.divBurgerBottom
      }` }
    />
  </button>
);

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;
