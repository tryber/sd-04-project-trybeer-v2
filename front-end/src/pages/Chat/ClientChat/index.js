import React, { useState, useEffect } from 'react';
import {
  Box, Text, Container, Button, Input,
} from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import MenuClient from '../../../components/MenuClient';
import ChatMessageCard from '../../../components/ChatMessageCard';
import { clientConnect, clientSendMessage, previousMessages } from '../../../api';

// import socketIoClient from 'socket.io-client';
// const ENDPOINT = 'http://127.0.0.1:3002';

const ClientChat = () => {
  const startingCount = 0;
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState('');
  const [historyMessages, setHistoryMessages] = useState([]);
  const [counter, setCounter] = useState(startingCount);

  function createMessageData(event) {
    const message = event.target.elements.messageInput.value;
    const nickname = user.email;
    const chat = `1-${user.id}`;
    const msgData = { nickname, message, chat };
    return msgData;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newMsg = createMessageData(event);
    clientSendMessage(socket, newMsg);
    // console.log('historyMsg: ', historyMsg);
    // apaga campo do imput
    event.target.elements.messageInput.value = '';
    // depois de enviar a msg o cursor fica no imput
    event.target.elements.messageInput.focus();
    setCounter(counter + 1);
    // Fazendo uma nova chamada do histórico para aparecer a nova mensagem
    previousMessages(newMsg.chat);
    socket.on('historyMessages', (previousMsg) => {
      // console.log('historyMessages: ', previousMsg);
      setHistoryMessages(previousMsg);
    });
  }

  useEffect(() => {
    const localUser = localStorage.user || null;
    const { id, email } = jwtDecode(localUser).dataValues;
    setUser({ id, email });

    // Solução 1
    const socketInUseEffect = clientConnect();
    // setSocket(clientConnect());
    setSocket(socketInUseEffect);
    previousMessages(`1-${id}`);
    // console.log('CLient-Id: ', socketInUseEffect);
    // console.log('socket-Id: ', socketInUseEffect.id);
    socketInUseEffect.on('historyMessages', (previousMsg) => {
      // console.log('historyMessages: ', previousMsg);
      setHistoryMessages(previousMsg);
    });
    // CLEAN UP THE EFFECT (prevent memory leak)
    // Referência: https://www.valentinog.com/blog/socket-react/
    return () => socketInUseEffect.disconnect();

    // Testes com socket criado diretamente no ClientChat
    // Solução 2
    // const socket = socketIoClient(ENDPOINT);
    // setSocket(socket);
    // console.log('CLient-Id: ', socket);
    // console.log('socket-Id: ', socket.id);
    // const chat = `1-${id}`;
    // console.log('chat', chat);
    // socket.emit('previousMessages', chat);
    // socket.on('historyMessages', (previousMsg) => {
    //   console.log('historyMessages: ', previousMsg);
    //   setHistoryMessages(previousMsg);
    // });
    // CLEAN UP THE EFFECT (prevent memory leak)
    // Referência: https://www.valentinog.com/blog/socket-react/
    // return () => socket.disconnect();
  }, []);

  useEffect(() => {
    // O histórico de mensagens não é reenviado,
    // quando envia uma nova mensagem pelo chat/input.

    // const historyMsg = history();
    // console.log('history2', historyMsg);
    // setHistoryMessages(historyMsg);
    // const socketInUseEffect = clientConnect();
    // socketInUseEffect.on('historyMessages', (previousMsg) => {
    //   console.log('historyMessages2: ', previousMsg);
    //   setHistoryMessages(previousMsg);
    // });
    // return () => socketInUseEffect.disconnect();
  }, [counter]);

  /*
  Req. 6 e 9
  - Passar os dados pelo socket.
  OK - Tentando mandar historico de msg do back pro front
  - Refatorar a API
  - Renderizar as mensagens na tela
    OK - Histórico de mensagens
    - Mensagens enviadas pelo cliente
    - Mensagens enviadas pelo admin
  OK - Criar um componente para a estrutura das mensagens

  id do usuário
  id da loja, ou administrador
  nickname, message, chat
  */
  return (
    <Box>
      <MenuClient header="Chat da loja" />
      <Text>ClientChat - Conversas com a loja</Text>

      <Container>
        <Container pb="3px">
          {historyMessages ? historyMessages.map((message) => (
            // eslint-disable-next-line no-underscore-dangle
            <ChatMessageCard msg={ message } key={ message.id } />
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
    </Box>
  );
};

export default ClientChat;
