import React from 'react';
import io from 'socket.io-client';
import TopBar from '../../components/ClientBar';

const socket = io('http://localhost:3001');

const ChatAdmin = () => {
  const loginInStorage = JSON.parse(localStorage.getItem('user'));

  const createCard = (data) => {
    const divBoxMessages = document.getElementById('messageBoxes');
    const cardMessages = document.createElement('div');
    cardMessages.setAttribute('className', 'card');
    const nameBox = document.createElement('p');
    nameBox.setAttribute('className', 'card-title' )
    const hourBox = document.createElement('p')
    hourBox.innerHTML = data.date;
    nameBox.innerHTML = data.nickname;
    cardMessages.appendChild(nameBox);
    cardMessages.appendChild(hourBox)
    divBoxMessages.appendChild(cardMessages);


  };

  if (loginInStorage.role === 'administrator') {
    socket.emit('showAllMessages');

    socket.on('listByName', (data) => {
      const lastMessages = [];

      data.forEach((item, index) => {
        lastMessages.push(item[item.length -1])
      });

      lastMessages.forEach((item)=> {
        if(item !== undefined){
          createCard(item)
        }
      })
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
