import React, { useEffect, useReducer, useRef, useState } from 'react';
import { sendIcon } from '../images';
import '../css/chat.css';
import Message from '../components/Message';

function Chat({ adm, activeRoom }) {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useReducer(
    (state, newState) => ([...state, ...newState]), [])
  const list = useRef();

  const sendMsg = () => {
    if (msg) {
      window.socket.emit('message', msg);
      setMsg('');
    }
  };

  const enterHandle = (e) => { if (e.which === 13) sendMsg() }

  useEffect(() => { //when receive msg scroll to the bottom if scrollbar is at least 70%
    const crr = list.current
    const scrollDown = crr.scrollTop >= crr.scrollHeight * 0.5;
    if (scrollDown) crr.scrollTop = crr.scrollHeight;
  }, [chat])

  useEffect(() => {
    window.socket.emit('join', activeRoom, adm);
    window.socket.on('message', (msg) => {
      setChat(msg);
      list.current.scrollTop = list.current.scrollHeight;
    });
    return () => window.socket.off('message');
  }, [activeRoom, adm])

  return (
    <div className="page-content chat-page">
      <div className="messages-container" ref={ list }>
        { chat.map((m, i) => <Message msg={ m } itsMe={ adm ? m.nickname === 'Loja' : m.nickname !== 'Loja' } 
        key={m.nickname + i} />) }
      </div>
      <div className="msg-input">
        <input type="text" placeholder="Digite..." autoComplete="off" value={ msg }
          onChange={ (e) => setMsg(e.target.value) } onKeyDown={ enterHandle } />
        <button onClick={ sendMsg }><img src={ sendIcon } alt="send message" /></button>
      </div>
    </div>
  );
}

export default Chat;
