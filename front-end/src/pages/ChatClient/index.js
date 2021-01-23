import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../context';
import Header from '../../components/Header';
import MessageBox from '../../components/MessageBox';
import './styles.css';

// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0
// https://daveceddia.com/usestate-hook-examples/
// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format

const socket = window.io('http://localhost:3001');
// console.log(window);

const ChatClient = () => {
  const [newMessage, setNewMessage] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  // const [socket, setSocket] = useState('');
  const { messages, setMessages } = useContext(Context);

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    const { dataValues: { email } } = JSON.parse(localStorage.getItem('user'));
    // setMessages([ ...messages, { user: email, clock: time, content: newMessage }]);
    socket.emit('message', {
      email, message: newMessage
    })
    setNewMessage('');
  };

  useEffect(() => {
    console.log(socket);
    // const now = newDate.toLocaleString([], { hour12: false }).substr(11, 5);
    socket.on('newMessage', (composeMessage) => {
      console.log(composeMessage);
    })
    
    
  }, []);

  return (
    <div>
      <Header title="Finalizar Pedido" dataTestid="top-title" />
      <div class="messages-container">
        <ul class="messages">{messages.map((message) => <MessageBox user={message.user} clock={message.clock} content={message.content} />)}</ul>
      </div>
      <div class="form">
        <input
          value={ newMessage }
          onChange={ handleNewMessage }
          data-testid="message-input"
        />
        <button
          type="button"
          data-testid="send-message"
          onClick={ sendMessage }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatClient;
