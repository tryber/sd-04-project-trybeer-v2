import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from '../../components/Header';
import MessageBox from '../../components/MessageBox';
import './styles.css';

// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0
// https://daveceddia.com/usestate-hook-examples/
// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format

const socket = io('http://localhost:3001');

const ChatAdmin = () => {
  const [newMessage, setNewMessage] = useState('');
  const [composeMessage, setComposeMessage] = useState('');

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    const { dataValues: { email } } = JSON.parse(localStorage.getItem('user'));
    socket.emit('message', {
      email, message: newMessage,
    });
    setNewMessage('');
  };

  useEffect(() => {
    socket.on('oldMessages', (msg) => {
      setComposeMessage([...composeMessage, msg]);
    });

    socket.on('newMessage', (msg) => {
      // console.log(msg);
      setComposeMessage([...composeMessage, msg]);
    });
  }, [composeMessage]);

  return (
    <div>
      <Header title="Finalizar Pedido" dataTestid="top-title" />
      <div className="messages-container">
        <ul className="messages">
          {composeMessage
            && composeMessage.map(({ email, now, message }) => (
              <MessageBox key={ email } user={ email } clock={ now } content={ message } />
            ))}
        </ul>
      </div>
      <div className="form">
        <input
          value={ newMessage }
          onChange={ handleNewMessage }
          data-testid="message-input"
        />
        <button
          type="button"
          data-testid="send-message"
          onClick={ sendMessage }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAdmin;
