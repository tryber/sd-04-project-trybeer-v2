import React from 'react';
import io from 'socket.io-client';
import TopBar from '../../components/ClientBar';

const socket = io('http://localhost:3001');

// AGORA DEVO CRIAR as conversas do adm com o usuário, poderei salvar as
// conversas no mesmo local de conversas do usuário, porém o nickname será
// diferente, então talvez não seja possível
// TALVEZ deva salvar toda a conversa exclusivamente no banco do administrator
// ou a conversa inteira no banco do administrator

const ChatAdmin = () => {
  const loginInStorage = JSON.parse(localStorage.getItem('user'));

  const createCard = (data) => {
    const divBoxMessages = document.getElementById('messageBoxes');
    const cardMessages = document.createElement('div');
    cardMessages.setAttribute('className', 'card');
    cardMessages.setAttribute('data-testid', 'containerChat');
    const nameBox = document.createElement('p');
    nameBox.setAttribute('className', 'card-title');
    nameBox.setAttribute('data-testid', 'profile-name');
    const hourBox = document.createElement('p');
    hourBox.innerHTML = data.date;
    hourBox.setAttribute('data-testid', 'last-message');
    nameBox.innerHTML = data.nickname;
    cardMessages.appendChild(nameBox);
    cardMessages.appendChild(hourBox);
    divBoxMessages.appendChild(cardMessages);
  };

  const emptyMessages = () => {
    const messageAlert = document.createElement('h1');
    messageAlert.innerHTML = 'Nenhuma conversa por aqui';
    messageAlert.setAttribute('data-testid', 'text-for-no-conversation');
    const divBoxMessages = document.getElementById('messageBoxes');
    divBoxMessages.appendChild(messageAlert);
  };

  if (loginInStorage.role === 'administrator') {
    socket.emit('showAllMessages');

    socket.on('listByName', (data) => {
      const lastMessages = [];
      const listData = [];
      listData.push(data);
      listData.forEach((item) => {
        lastMessages.push(item[data.length - 1]);
      });
      lastMessages.forEach((item) => {
        if (item !== undefined) {
          createCard(item);
        } else {
          return emptyMessages();
        }
        return null;
      });
    });

    return (
      <div>
        <TopBar
          data-testid="top-title"
          title="Detalhes do Pedido"
          isAdm
          isDetails
        />
        <div className="container">
          <h1 className="messages" id="messageBoxes">
            Todas as conversas
          </h1>
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
