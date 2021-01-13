import React, { useState, useEffect } from 'react';
import {
  Box, Text, Container, Button, Input
} from '@chakra-ui/react';
import MenuClient from '../../../components/MenuClient';
import { addMessageClient, getMessageByClient, clientConnect } from '../../../api';
import jwtDecode from 'jwt-decode';

const ClientChat = () => {
  const [user, setUser] = useState({});
  const [historyMessages, setHistoryMessages] = useState([]);

  async function handleSubmit (event) {
    event.preventDefault();
    const message = event.target.elements.messageInput.value;
    const nickname = user.email;
    const chat = `1-${user.id}`;
    const newMessage = await addMessageClient(nickname, message, chat);
    console.log('Event.target: ', event.target);
    console.log(newMessage);
  }

  useEffect( async () => {
    const user = localStorage.user || null;
    const { id, email } = jwtDecode(user).dataValues;
    setUser({ id, email });
    const previousMessages = await getMessageByClient(`1-${id}`);
    setHistoryMessages(previousMessages);
    clientConnect();
  }, []);

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
          <Box>
            <Text data-testid="nickname"></Text>
            <Text data-testid="message-time"></Text>
            <Text data-testid="text-message"></Text>
          </Box>
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
