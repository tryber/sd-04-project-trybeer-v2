import React, { useEffect, useReducer, useRef, useState } from 'react';
import Header from '../components/Header';
import { sendIcon } from '../images';
import '../css/chat.css';
import Message from '../components/Message';

let socket;
const { email, role } = JSON.parse(localStorage.user);
const adm = role === 'administrator';

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useReducer(
    (state, newState) => [...state, ...newState],
    [],
  );
  const list = useRef();

  const sendMsg = () => {
    if (msg) {
      socket.emit('message', msg);
      setMsg('');
    }
  };

  useEffect(() => {
    //when receive msg scroll to the bottom if scrollbar is at least 70%
    const crr = list.current;
    const scrollDown = crr.scrollTop >= crr.scrollHeight * 0.5;
    if (scrollDown) crr.scrollTop = crr.scrollHeight;
  }, [chat]);

  useEffect(() => {
    socket = window.io('http://localhost:3001');
    socket.emit('join', email, adm);
    socket.on('message', (msg) => {
      setChat(msg);
      list.current.scrollTop = list.current.scrollHeight;
    });
  }, []);

  return (
    <div className='page chat'>
      <Header>Chat</Header>
      <div className='page-content chat-page'>
        <div className='messages-container' ref={list}>
          {chat.map((m) => (
            <Message
              msg={m}
              itsMe={email === m.nickname || (adm && m.nickname === 'loja')}
            />
          ))}
        </div>
        <div className='msg-input'>
          <input
            type='text'
            placeholder='Digite...'
            autoComplete='off'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={sendMsg}>
            <img src={sendIcon} alt='send message' />
          </button>
        </div>
      </div>
    </div>
  );
}
