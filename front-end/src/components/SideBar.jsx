import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFromLocalStorage,
  // loadFromLocalStorage,
} from '../services/localStorage';
import { logout } from '../store/ducks/user';
// import { changeVisibility } from '../store/ducks/sideBarHide';

import './SideBar.css';

const one = 1;

const menus = {
  client: [
    {
      route: '/products',
      label: 'Products',
      dataTestID: 'side-menu-item-products',
    },
    {
      route: '/orders',
      label: 'Meu Pedidos',
      dataTestID: 'side-menu-item-my-orders',
    },
    {
      route: '/profile',
      label: 'Meu Perfil',
      dataTestID: 'side-menu-item-my-profile',
    },
    {
      route: '/chat',
      label: 'Conversar com a loja',
      dataTestID: 'side-menu-chat',
    },
  ],
  administrator: [
    {
      route: '/admin/orders',
      label: 'Pedidos',
      dataTestID: 'side-menu-item-orders',
    },
    {
      route: '/admin/profile',
      label: 'Meu Perfil',
      dataTestID: 'side-menu-item-profile',
    },
    {
      route: '/admin/chats',
      label: 'Conversas',
      dataTestID: 'side-menu-item-chat',
    },
  ],
};

const SideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // Set all local Action/Reducers
  // const { isLoggedIn } = useSelector((state) => state.userReducer.session);
  const { role } = useSelector((state) => state.userReducer.user);

  const handleClick = () => {
    dispatch(logout());
    deleteFromLocalStorage('user');
    history.push('/login');
  };

  return (
    <div
      className={
        role === 'client' ? 'side-menu-container' : 'admin-side-bar-container'
      }
    >
      <ul>
        {menus[role].map((menu) => (
          <li key={ menu.dataTestID + one }>
            <Link to={ menu.route } data-testid={ menu.dataTestID }>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" data-testid="side-menu-item-logout" onClick={ () => handleClick() }>
        Sair
      </button>
    </div>
  );
};
export default SideBar;
