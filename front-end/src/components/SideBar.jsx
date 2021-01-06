import PropTypes from 'prop-types';
import React from 'react';

export default function SideBar({ userRole, active }) {
  return (
    <aside className={ `side-container ${active && 'appear'}` }>
      {userRole === 'client' && (
        <div className={ `${active && 'side-menu-container'} side-bar` }>
          <div>
            <a href="/products" data-testid="side-menu-item-products">
              Produtos
            </a>
            <a href="/orders" data-testid="side-menu-item-my-orders">
              Meus pedidos
            </a>
            <a href="/profile" data-testid="side-menu-item-my-profile">
              Meu perfil
            </a>
            <a href="/chat" data-testid="side-menu-chat">
              Conversar com a loja
            </a>
          </div>
          <a href="/login" data-testid="side-menu-item-logout">
            Sair
          </a>
        </div>
      )}
      {userRole === 'administrator' && (
        <div className="admin-side-bar-container side-bar">
          <div>
            <a href="/admin/orders" data-testid="side-menu-item-orders">
              Meus pedidos
            </a>
            <a href="/admin/profile" data-testid="side-menu-item-profile">
              Meu perfil
            </a>
            <a href="/admin/chat" data-testid="side-menu-item-chat">
              Conversas
            </a>
          </div>
          <a href="/login" data-testid="side-menu-item-logout">
            Sair
          </a>
        </div>
      )}
    </aside>
  );
}

SideBar.propTypes = {
  active: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
};
