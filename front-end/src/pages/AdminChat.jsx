import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import io from 'socket.io-client';

import MenuAdmin from '../components/MenuAdmin';

const AdminChat = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const [messages, setMessages] = useState([]);

  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return setRedirectToLogin(true);
    }

    const socket = io('http://localhost:8080');

    socket.on('messagesHistory', (payload) => {
      setMessages(payload);
    });

    return setAdminEmail(userData.email);
  }, []);

  return (
    <div>
      <MenuAdmin />
      {redirectToLogin && <Redirect to="/login" />}
      {adminEmail && <h1>{`Conversas - ${adminEmail}`}</h1>}
      {!messages.length && (
        <h1 data-testid="text-for-no-conversation">
          Nenhuma conversa por aqui
        </h1>
      )}
      {messages.length && (
        <Link to="/admin/chat">
          <div data-testid="containerChat">
            <p data-testid="profile-name">
              {messages[messages.length - 1].nickname}
            </p>
            <p data-testid="last-message">
              {`Última mensagem às ${messages[messages.length - 1].date}`}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};
export default connect(null, null)(AdminChat);
