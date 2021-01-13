import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import Menu from '../components/Menu';

const ClientChat = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState([]);

  const [nickname, setNickname] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return setRedirectToLogin(true);
    }

    const socketIo = io('http://localhost:8080');
    setSocket(socketIo);

    socketIo.on('messagesHistory', (payload) => {
      setMessages(payload);
    });

    return setNickname(userData.email);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    // emitir o evento para salvar a mensagem
    socket.emit('saveMessage', { messageText, nickname });
    //

    socket.on('message', (payload) => {
      // const { nickname, date, chatMessage } = payload;
      setMessages([...messages, payload]);
    });

    e.target.reset();
  };

  return (
    <div>
      <Menu title="TryBeer" />
      {redirectToLogin && <Redirect to="/login" />}
      <div id="messagesList">
        {messages.length
        && messages.map((msg) => (
          <div key={ msg.date }>
            <p data-testid="nickname">{msg.nickname}</p>
            <p data-testid="message-time">{msg.date}</p>
            <p data-testid="text-message">{msg.chatMessage}</p>
          </div>
        ))}
      </div>
      <form onSubmit={ (e) => sendMessage(e) }>
        <input
          type="text"
          data-testid="message-input"
          onChange={ (e) => setMessageText(e.target.value) }
        />
        <button type="submit" data-testid="send-message">
          Enviar
        </button>
      </form>
    </div>
  );
};
export default connect(null, null)(ClientChat);
