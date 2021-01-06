import React, { useEffect, useState } from 'react'
import { getChats } from '../services/TrybeerApi'

function AdminChat() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats().then(setChats);
  }, []);

  return (
    <div className="page">
      <Header>Chat</Header>
      <div className="page-content">
        { chats.length < 1
          ? <span data-testid='text-for-no-conversation'>Nenhuma conversa por aqui</span>
          : chats.map(({ nickname, time }) => (
            <div data-testid="containerChat">
              <span data-testid="profile-name">{ nickname }</span>
              <span data-testid="last-message">Última mensagem às { time }</span>
            </div>
          )) }
      </div>
    </div>
  )
}

export default AdminChat
