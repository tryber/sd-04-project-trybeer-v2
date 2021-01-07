import React, { useEffect, useState } from 'react'
import { getChats } from '../services/TrybeerApi'

function AdminChat({ setRoom }) {
  const [chats, setChats] = useState([])

  useEffect(() => {
    getChats().then(({ data }) => {
      setChats(data)
    });
    window.socket.on('chatList', setChats)
    return () => window.socket.off('chatList');
  }, []);

  return (
    <div className="page-content">
      { chats.length < 1
        ? <span data-testid='text-for-no-conversation'>Nenhuma conversa por aqui</span>
        : chats.map(({ nickname, messages }, i) => (
          <div data-testid="containerChat" onClick={ () => setRoom(nickname) } key={nickname + i}>
            <span data-testid="profile-name">{ nickname }</span>
            <span data-testid="last-message">Última mensagem às { messages.slice(-1)[0].time }</span>
          </div>
        )) }
    </div>
  )
}

export default AdminChat
