import React, { useEffect, useState } from 'react';
import { getLS } from '../../utils';
import { USER_CONNECTED, MESSAGE_SENT, MESSAGE_RECEIVED } from '../../helpers/chatEvents';
import Message from '../../components/Message';
import Menu from '../../components/Menu';
import styles from './index.module.css';

const socket = window.io('http://localhost:3001');

const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState('cliente');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setUsername(getLS('user').email);
    setUserId(getLS('userId'));
    setUserRole(getLS('user').role);

    console.log(socket);

    socket.emit(USER_CONNECTED, {
      userId, username, userRole, socketId: socket.id,
    });
  }, [username, userId, userRole]);

  useEffect(() => {
    socket.on(MESSAGE_RECEIVED, (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [input] = e.target;

    socket.emit(MESSAGE_SENT, {
      message: input.value, username, userId, socketId: socket.id,
    });
  };

  return (
    <div className={ styles.chatContainer }>
      <Menu nomeTela="Chat" />
      <div>
        <ul>
          {chat.map(({ sender, time, message }) => (<Message
            key={ `${sender}${message}` }
            username={ sender }
            time={ time }
            message={ message }
          />))}
        </ul>
      </div>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <input id="messages" data-testid="message-input" />
        <button
          type="submit"
          data-testid="send-message"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
