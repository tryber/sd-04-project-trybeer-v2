import React from 'react'
import Header from '../components/Header'

function Chat() {
  window.socket.on('test', () => console.log('funciona'))
  return (
    <div className="page">
      <Header>Chat</Header>
      <div className="page-content">
        
      </div>
    </div>
  )
}

export default Chat
