import React, { useEffect } from 'react';
import Header from '../components/Header';

let socket;

function Chat() {

  useEffect(()=> {
    socket = window.io('http://localhost:3001');
    socket.emit('join', JSON.parse(localStorage.user).email);
    socket.emit('message', 'testando app')
    socket.on('message', data => {console.log(data)})
  },[])
  return (
    <div className="page">
      <Header>Chat</Header>
      <div className="page-content"></div>
    </div>
  );
}

export default Chat;
