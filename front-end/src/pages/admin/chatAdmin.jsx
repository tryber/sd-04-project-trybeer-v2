import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TopBar from '../../components/ClientBar';

const socket = io('http://localhost:3001');

const ChatAdmin = () => {
  const [onChat, setOnChat] = useState(localStorage.getItem('onChat') || false);
  const [allMessages, setAllMessages] = useState([]);
  const [lastMsgState, setLastMsgState] = useState('');
  const [onSender, setOnSender] = useState(
    localStorage.getItem('sender') || ''
  );
  const [stateMsg, setStateMsg] = useState('');

  console.log(lastMsgState);

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
        (name) => name.sender !== 'Loja'
      );

      setLastMsgState(userLastMessages);
    });

  }, []);

  const sendMessage = (message, nickname) => {

    socket.emit('message', { chatMessage: message, nickname, sender: 'Loja' });
  };

  const viewChat = (data) => (
    <div className="container">
      {data.map((item) => (
        <article
          className={
            item.sender === 'Loja'
              ? 'message is-link is-4 is-offset-8'
              : 'message is-warning'
          }
          key={item}
        >
          <div className="columns">
            <div className="message-header" data-testid="nickname">
              <p>{item.sender}</p>
            </div>
            <div className="message-body">
              <h4 data-testid="text-message">{item.chatMessage}</h4>
              <h5 data-testid="message-time">{item.date}</h5>
            </div>
          </div>
          <hr />
        </article>
      ))}

      <div className="field">
        <label>Loja</label>
        <div className="control">
          <input
            className="input is-primary"
            breakpoint="mobile"
            type="text"
            placeholder="Digite sua Mensagem"
            data-testid="message-input"
            onChange={(e) => setStateMsg(e.target.value)}
          />
        </div>
      </div>

      <button
        className="button is-primary"
        type="submit"
        data-testid="send-message"
        onClick={() => sendMessage(stateMsg, data[0].nickname)}
      >
        Enviar
      </button>
    </div>
  );

  const renderChat = (userSender, newAllMessages) => {

    const filterFromUser = newAllMessages.filter((messages) =>
      messages[0] ? messages[0].nickname === userSender : false
    );

    const data = filterFromUser[0] || [];
    return viewChat(data);
  };

  {
    const openChat = (sender) => {
      setOnSender(sender); // seta no state local o sender que clicou
      //localStorage.setItem('onChat', JSON.stringify(true));
      localStorage.setItem('sender', sender);
      setOnChat(true);
    };

    const numMagic = 0;

    if (onChat === false) {
      return (
        <div className="bodyAdm is-justify-content-center">
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
                  key={item.sender}
                  data-testid="containerChat"
                  onClick={() => openChat(item.sender)}
                >
                  <section
                    className="hero is-small is-info is-bold"
                    gradient
                    color="link"
                    size="small"
                  >
                    <div className="hero-body">
                      <div className="container">
                        <h4 className="title" data-testid="profile-name">
                          {item.sender}
                        </h4>
                        <h4
                          as="h4"
                          className="subtitle"
                          data-testid="last-message"
                        >
                          {item.date}
                        </h4>
                      </div>
                    </div>
                  </section>
                </button>
              ))
            ) : (
              <div
                data-testid="text-for-no-conversation"
              >
                <div className="container">
                <h1 className="container has-text-link">Nenhuma conversa por aqui</h1>

                  </div>
            
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="bodyAdm" id="mensagensList">
          <TopBar
            data-testid="top-title"
            title="Detalhes do Pedido"
            isAdm
            isDetails
          />
          <div className="container">
            <div className="container is-small">
              <button
                className="button is-danger is-outlined"
                type="button"
                data-testid="back-button"
                onClick={() => setOnChat(false)}
              >
                Voltar
              </button>
            </div>
            <div className="container">
              <section className="hero is-small is-info is-bold">
                <div className="hero-body">
                  <h3 className="title">Histórico de Mensagens</h3>
                </div>
              </section>
            </div>
            {allMessages && renderChat(onSender, allMessages)}
          </div>
        </div>
      </div>
    );
  }
};

export default ChatAdmin;
