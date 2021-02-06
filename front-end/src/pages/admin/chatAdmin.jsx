import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TopBar from '../../components/ClientBar';

const socket = io('http://localhost:3001');

const ChatAdmin = () => {
  const [onChat, setOnChat] = useState(localStorage.getItem('onChat') || false);
  const [allMessages, setAllMessages] = useState([]);
  const [lastMsgState, setLastMsgState] = useState('');
  const [onSender, setOnSender] = useState(
    localStorage.getItem('sender') || '',
  );
  const [stateMsg, setStateMsg] = useState('');

  // console.log(allMessages, 'aqui teste render msg');

  useEffect(() => {
    const loginInStorage = JSON.parse(localStorage.getItem('user'));

    if (loginInStorage.role === 'administrator') {
      socket.emit('showAllMessages');
    }

    const lastMessages = [];

    socket.on('listByName', (data) => {
      setAllMessages(data);

      data.forEach((item) => {
        const lastItem = item[item.length - 1];

        if (lastItem) {
          lastMessages.push(lastItem);
        }
      });

      const userLastMessages = lastMessages.filter(
        (name) => name.sender !== 'Loja',
      );

      setLastMsgState(userLastMessages);
    });

    /* socket.on('renderMessage', (message, timestamp) => {
      addNewMessage(message, timestamp);
    }); */
  }, []);

  const sendMessage = (message, nickname) => {
    // console.log('aqui message', message);

    // setAllMessages((dados) => [[...dados], [{chatMessage: message, nickname, sender: 'Loja'}]]);

    socket.emit('message', { chatMessage: message, nickname, sender: 'Loja' });
  };

  const viewChat = (data) => (
    <div>
      {data.map((item) => (
        <div key={ item } className="container">
          <h3 data-testid="nickname">{item.sender}</h3>
          <h4 data-testid="text-message">{item.chatMessage}</h4>
          <h5 data-testid="message-time">{item.date}</h5>
          <hr />
        </div>
      ))}
      <input
        type="text"
        data-testid="message-input"
        onChange={ (e) => setStateMsg(e.target.value) }
      />
      <button
        type="submit"
        data-testid="send-message"
        onClick={ () => sendMessage(stateMsg, data[0].nickname) }
      >
        Enviar
      </button>
    </div>
  );

  const renderChat = (userSender, newAllMessages) => {
    // console.log(userSender, 'AQUI USER SENDER');

    const filterFromUser = newAllMessages.filter((messages) => {
    //  console.log(messages, 'DENTRO DO FILTER MESSAGES');
      return messages[0] ? messages[0].nickname === userSender : false;
    });
    const data = filterFromUser[0] || [];
    // console.log(filterFromUser, 'FILTER FROM USER');
    return viewChat(data);
  };

  {
    const openChat = (sender) => {
      setOnSender(sender); // seta no state local o sender que clicou
      localStorage.setItem('onChat', JSON.stringify(true));
      localStorage.setItem('sender', sender);
      setOnChat(true);
    };

    const numMagic = 0;

    if (onChat === false) {
      return (
        <div className="bodyAdm">
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
            {lastMsgState && lastMsgState.length > numMagic ? (
              lastMsgState.map((item) => (
                <button
                  type="button"
                  key={ item.sender }
                  data-testid="containerChat"
                  onClick={ () => openChat(item.sender) }
                >
                  <div>
                    <h3 data-testid="profile-name">{item.sender}</h3>
                    <h4 data-testid="last-message">{item.date}</h4>
                  </div>
                </button>
              ))
            ) : (
              <h2 data-testid="text-for-no-conversation">
                Nenhuma conversa por aqui
              </h2>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bodyAdm" id="mensagensList">
        <TopBar
          data-testid="top-title"
          title="Detalhes do Pedido"
          isAdm
          isDetails
        />
        <div>
          <button
            type="button"
            data-testid="back-button"
            onClick={ () => setOnChat(false) }
          >
            Voltar
          </button>
        </div>
        {allMessages && renderChat(onSender, allMessages)}
      </div>
    );
  }
};

export default ChatAdmin;
