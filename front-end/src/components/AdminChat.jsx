import React, { useEffect, useState } from 'react'
import { getChats } from '../services/TrybeerApi'

function AdminChat({ setRoom }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats().then(setChats);
  }, []);

  return (
    <div className="page-content">
      { chats.length < 1
        ? <span data-testid='text-for-no-conversation'>Nenhuma conversa por aqui</span>
        : chats.map(({ nickname, messages }) => (
          <div data-testid="containerChat" onClick={() => setRoom(nickname)}>
            <span data-testid="profile-name">{ nickname }</span>
            <span data-testid="last-message">Última mensagem às { messages.pop().time }</span>
          </div>
        )) }
    </div>
  )
}

export default AdminChat
