import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChatPanel = () => {
  const { email } = useSelector((state) => state.userReducer.user);

  // Set all local Action/Reducers
  const [message, setMessage] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const sliceMinus2 = -2;

  window.socket = window.io('http://localhost:3001', {
    query: {
      clientId: email,
    },
  });

  window.socket.on('connection', () => {});

  function handleClick(event) {
    const today = new Date();
    const hours = (`0${today.getHours()}`).slice(sliceMinus2); // Add 0 if hour <10
    const minutes = (`0${today.getMinutes()}`).slice(sliceMinus2); // Add 0 if min <10
    const time = `${hours}:${minutes}`;
    setAllMessages([...allMessages, { user: email, text: message, time }]);
    setMessage('');
    window.socket.emit('message', {
      text: message,
      time,
      userId: email,
    });
    event.preventDefault();
  }

  return (
    <>
      <h1>WebChat CLIENT </h1>
      <div>
        {allMessages.map((chat) => (
          <>
            <h3 data-testid="nickname">{chat.user}</h3>
            <h2 data-testid="message-time">{chat.time}</h2>
            <h2 data-testid="text-message">{chat.text}</h2>
          </>
        ))}
      </div>
      <div className="globalContainer">
        <form className="formContainer">
          <label htmlFor="message">
            Your message
            <input
              name="message"
              type="text"
              data-testid="message-input"
              placeholder="Digit seu mensagem"
              value={ message }
              onChange={ (event) => setMessage(event.target.value) }
            />
          </label>
          <button
            data-testid="send-message"
            type="button"
            onClick={ handleClick }
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPanel;
