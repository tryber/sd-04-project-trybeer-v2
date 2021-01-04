import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './ClientBar.css';

let ctrOpen = false;

const changeOpen = () => {
  const menuBtn = document.querySelectorAll('.menu-btn')[0];
  const navTrigger = document.querySelectorAll('.body-nav-bar')[0];

  if (!ctrOpen) {
    menuBtn.classList.add('open');
    navTrigger.classList.add('open');
    ctrOpen = true;
    return null;
  }
  menuBtn.classList.remove('open');
  navTrigger.classList.remove('open');
  ctrOpen = false;
};

const changeUrl = (history, url, clear, isDetails) => {
  if(isDetails) {
    history.replace('/');
  }
  history.push(url);
  if (clear) {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }
  ctrOpen = false;
};

const admOnline = (history, title) => {
  return (
    <nav className="admin-side-bar-container">
      <div>
        <h3 className='title-adm' >{title}</h3>
        <button
          className="nav-btn-adm"
          data-testid="side-menu-item-orders"
          onClick={() => changeUrl(history, 'orders')}
        >
          Pedidos
        </button>
        <button
          className="nav-btn-adm"
          data-testid="side-menu-item-profile"
          onClick={() => changeUrl(history, 'profile')}
        >
          Perfil
        </button>
      </div>
      <button
        className="nav-btn-adm"
        data-testid="side-menu-item-logout"
        onClick={() => changeUrl(history, '', true)}
      >
        Sair
      </button>
    </nav>
  );
};

const TopBar = ({ title, isAdm, isDetails }) => {
  const history = useHistory();
  if (isAdm) return admOnline(history, title);
  return (
    <div>
      <div className="body-top-bar">
        <button className="menu-btn" onClick={() => changeOpen()} data-testid="top-hamburguer">
          <div className="menu-btn-burguer" />
        </button>
        <header className="title" data-testid="top-title">
          {title}
        </header>
        <div className="empty-box" />
      </div>
      <div className="body-nav-bar">
        <nav className="side-menu-container">
          <div>
            <button
              className="nav-btn"
              data-testid="side-menu-item-products"
              onClick={() => changeUrl(history, 'products', null, isDetails)}
            >
              Produtos
            </button>
            <button
              className="nav-btn"
              data-testid="side-menu-item-my-orders"
              onClick={() => changeUrl(history, 'orders', null, isDetails)}
            >
              Meus Pedidos
            </button>
            <button
              className="nav-btn"
              data-testid="side-menu-item-my-profile"
              onClick={() => changeUrl(history, 'profile', null, isDetails)}
            >
              Meu Perfil
            </button>
          </div>
          <button
            className="nav-btn"
            data-testid="side-menu-item-logout"
            onClick={() => changeUrl(history, '', true)}
          >
            Sair
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
