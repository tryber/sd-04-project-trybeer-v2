import React, { useState, useEffect } from 'react';
import {
  Text, Container, Button, Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ChatMessageCard from '../../../components/ChatMessageCard';
import {
  clientConnect, clientSendMessage, checkClient, previousMessages,
} from '../../../api';

const ClientChat = ({ admin, userProp }) => {
  const [socket, setSocket] = useState('');
  const [historyMessages, setHistoryMessages] = useState([]);

  function createMessageData(event) {
    const message = event.target.elements.messageInput.value;
    const msgData = { userEmail: userProp, nick: admin ? 'Loja' : userProp, message };
    return msgData;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newMsg = createMessageData(event);
    clientSendMessage(socket, newMsg);
    event.target.elements.messageInput.value = '';
    event.target.elements.messageInput.focus();
    previousMessages(socket, userProp);
    socket.on('historyMessages', (previousMsg) => {
      setHistoryMessages(previousMsg);
    });
  }

  useEffect(() => {
    const socketInUseEffect = clientConnect();
    setSocket(socketInUseEffect);
    if (!admin) checkClient(socketInUseEffect, userProp);
    previousMessages(socketInUseEffect, userProp);
    socketInUseEffect.on('historyMessages', (previousMsg) => {
      setHistoryMessages(previousMsg);
    });
    // CLEAN UP THE EFFECT (prevent memory leak)
    // Referência: https://www.valentinog.com/blog/socket-react/
    return () => socketInUseEffect.disconnect();
  }, [admin, userProp]);

  return (
    <Container>
      <Container pb="3px">
        {historyMessages && historyMessages.msgs ? historyMessages.msgs.map((message) => (
          <ChatMessageCard msg={ message } key={ Math.random() + 1 } />
        )) : <Text> Sem conversas com essa loja </Text>}
      </Container>
      <form
        action="chat.html"
        method="POST"
        onSubmit={ (event) => { handleSubmit(event); } }
      >
        <Input id="messageInput" name="message" data-testid="message-input" />
        <Button type="submit" data-testid="send-message">Enviar</Button>
      </form>
    </Container>
  );
};

ClientChat.propTypes = {
  userProp: PropTypes.string,
};

ClientChat.defaultProps = {
  userProp: 'User',
};

export default ClientChat;
