import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getChats } from '../services/TrybeerApi';

function AdminChat({ setRoom }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats().then(({ data }) => {
      setChats(data);
    });
    window.socket.on('chatList', setChats);
    return () => window.socket.off('chatList');
  }, []);

  return (
    <div className="page-content">
      { chats.length < 1
        ? <span data-testid="text-for-no-conversation">Nenhuma conversa por aqui</span>
        : chats.map(({ nickname, messages }) => (
          <button data-testid="containerChat" onClick={ () => setRoom(nickname) } key={ nickname } type="button">
            <span data-testid="profile-name">{ nickname }</span>
            <span data-testid="last-message">
              Última mensagem às
              { messages.slice(-1)[0].time }
            </span>
          </button>
        )) }
    </div>
  );
}

AdminChat.propTypes = {
  setRoom: PropTypes.func.isRequired,
};

export default AdminChat;
