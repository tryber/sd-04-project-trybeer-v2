import React, { useLayoutEffect, useState } from 'react'
import AdminChat from '../components/AdminChat';
import Chat from '../components/Chat';
import Header from '../components/Header'

const { email, role } = JSON.parse(localStorage.user);
const adm = role === 'administrator';

function ChatPage() {
  const [activeRoom, setActiveRoom] = useState(!adm && email)

  useLayoutEffect(() => { window.socket = window.io('http://localhost:3001') }, [])

  return (
    <div className="page chat">
      <Header>Chat</Header>
      {activeRoom ? <Chat activeRoom={ activeRoom } adm={ adm } /> : <AdminChat setRoom={ setActiveRoom } /> }
    </div>
  )
}

export default ChatPage
