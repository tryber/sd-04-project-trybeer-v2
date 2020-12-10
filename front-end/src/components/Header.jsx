import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import SideBar from './SideBar';
import { Duff, menuIcon } from '../images/index';
import '../css/header.css';

export default function Header({ children }) {
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
  const [btnBurguer, setBtnBurguer] = useState(
    userInfo.role === 'administrator',
  );
  if (!userInfo.role) return <Redirect to="/login" />;
  return (
    <div className="header-container">
      <header>
        <button
          data-testid="top-hamburguer"
          className="header-menu-icon"
          onClick={ () => setBtnBurguer(!btnBurguer) }
          type="button"
        >
          <img id="btn-hmb" src={ menuIcon } alt="Hamburguer menu icon" />
        </button>
        <img src={ Duff } alt="duff logo" className="duff-logo" />
        <span data-testid="top-title" className="header-title">{children}</span>
      </header>
      <SideBar userRole={ userInfo.role } active={ btnBurguer } />
    </div>
  );
}
