import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import io from 'socket.io-client';
import TopBar from '../../components/ClientBar';

const socket = io('http://localhost:3001');

const ChatAdmin = () => {
  const loginInStorage = JSON.parse(localStorage.getItem('user'));

  if (loginInStorage.role === 'administrator') {
    socket.emit('showAllMessages')
    return (
      <div>
        <TopBar
          data-testid="top-title"
          title="Detalhes do Pedido"
          isAdm={true}
          isDetails
        />
        <div className="container">
          <div className="header">
            <h1 className="" >Lista de Mensagens</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Página não encontrada</h1>
    </div>
  );
};

export default ChatAdmin;
