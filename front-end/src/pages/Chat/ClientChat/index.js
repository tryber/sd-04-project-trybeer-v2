import React, { useState, useEffect } from 'react';
import {
  Box, Text, Container, Button, Input,
} from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import MenuClient from '../../../components/MenuClient';
import { addMessageClient, getMessageByClient, clientConnect, clientSendMessage, previousMessages } from '../../../api';

const ClientChat = () => {
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState('');
  const [historyMessages, setHistoryMessages] = useState([]);
  const counter = 0;

  function createMessageData(event) {
    const message = event.target.elements.messageInput.value;
    const nickname = user.email;
    const chat = `1-${user.id}`;
    const msgData = { nickname, message, chat };
    return msgData;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    clientSendMessage(socket, createMessageData(event));
    console.log('historyMsg: ', historyMsg);
    // apaga campo do imput
    event.target.elements.messageInput.value = '';
    // depois de enviar a msg o cursor fica no imput
    event.target.elements.messageInput.focus();
    counter ++
  }

  useEffect(() => {
    const user = localStorage.user || null;
    const { id, email } = jwtDecode(user).dataValues;
    setUser({ id, email });
    setSocket(clientConnect());
    const historyMsg = previousMessages(socket, `1-${user.id}`);
    setHistoryMessages(historyMsg);
    
  }, []);

  useEffect(() => {
    const historyMsg = previousMessages(socket, `1-${user.id}`);
    setHistoryMessages(historyMsg);
  },[counter])

  /*
  Req. 6 e 9
  - Passar os dados pelo socket.
  - Refatorar a API
  - Renderizar as mensagens na tela
  - Criar um componente para a estrutura das mensagens

  id do usuário
  id da loja, ou administrador
  nickname, message, chat
  */
  return (
    <Box>
      <MenuClient header="Chat da loja" />
      <Text>ClientChat - Conversas com a loja</Text>

      <Container>
        <Container>
          Container para as mensagens
          {/* A box abaixo contem a estrutura da mensagem, transformar em componente */}
          {/* {historyMessages ? historyMessages.map((message) => {
            return (<Box>
            <Text data-testid="nickname">{ message.nickname }</Text>
            <Text data-testid="message-time">{ message.time }</Text>
            <Text data-testid="text-message">{ message.message }</Text>
          </Box> )
          }) : <Text> Sem conversas com essa loja </Text>} */}
          {/* <Box>
            <Text data-testid="nickname"></Text>
            <Text data-testid="message-time"></Text>
            <Text data-testid="text-message"></Text>
          </Box> */}
        </Container>
        <form
          action="chat.html"
          method="POST"
          onSubmit={ (event) => { handleSubmit(event) } }
        >
          <Input id="messageInput" name="message" data-testid="message-input" />
          <Button type='submit' data-testid="send-message">Enviar</Button>
        </form>
      </Container>
    </Box>
  );
};

export default ClientChat;
