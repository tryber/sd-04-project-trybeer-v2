import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
// import Header from '../../components/Header';
import SideMenuAdmin from '../../components/SideMenuAdmin';
import MessageBox from '../../components/MessageBox';
import './styles.css';

// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0
// https://daveceddia.com/usestate-hook-examples/
// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format

const socket = io('http://localhost:3001');

const ChatClient = () => {
  const [newMessage, setNewMessage] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const [oldMessages, setOldMessages] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [actualRoom, setActualRoom] = useState('');

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    socket.emit('message', {
      userEmail, message: newMessage, actualRoom,
    });
    setNewMessage('');
  };

  useEffect(() => {
    setUserEmail('Loja');
    const roomStg = localStorage.getItem('room');
    socket.emit('online', roomStg);
    setActualRoom(roomStg);
    socket.on('oldMessages', (msg) => {
      setOldMessages(msg);
    });
  }, []);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      setComposeMessage([...composeMessage, msg]);
    });
  }, [composeMessage]);

  return (
    <div>
      <SideMenuAdmin />
      <div className="messages-container-adm">
        <Link data-testid="back-button" to="/admin/chats" className="list-link">
          Conversando com
          { actualRoom }
        </Link>
        <ul className="messages-adm">
          {oldMessages && oldMessages.map(({ nickname, timestamp, message }) => (
            <MessageBox
              key={ nickname }
              user={ nickname }
              clock={ timestamp }
              content={ message }
            />
          ))}
          {composeMessage
            && composeMessage.map(({ nick, now, message }) => (
              <MessageBox key={ nick } user={ nick } clock={ now } content={ message } />
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

export default ChatClient;
