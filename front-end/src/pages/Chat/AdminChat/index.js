import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Text, Button } from '@chakra-ui/react';
import MenuAdmin from '../../../components/MenuAdmin';
import { getChatUsers } from '../../../api';
import ChatCard from '../../../components/ChatCard';
import ClientChat from '../ClientChat';

const AdminChat = () => {
  const emptyArray = 0;
  const history = useHistory();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    if (!localStorage.user) history.push('/login');
    getChatUsers()
      .then((chatData) => { setData(chatData.data); });
  }, [history, setData]);

  const displayChat = (event) => {
    setUser(event);
    setShowChat(!showChat);
  };

  const printChats = (userArray) => {
    if (userArray.length > emptyArray) {
      return userArray.map((e) => (
        <Flex key={ e.userEmail } onClick={ () => displayChat(e.userEmail) }>
          <ChatCard data={ e } key={ e.id } />
        </Flex>
      ));
    }

    return <Text data-testid="text-for-no-conversation">Nenhuma conversa por aqui</Text>;
  };
  return (
    <Flex direction="row" h="100vh">
      <MenuAdmin />
      <Flex direction="column" display={ showChat ? 'none' : 'block' }>
        {data ? (printChats(data)) : (
          <Text>Loading...</Text>
        )}
      </Flex>
      <Flex display={ showChat ? 'block' : 'none' }>
        <Button onClick={ () => setShowChat(!showChat) } data-testid="back-button">Voltar</Button>
        <ClientChat userProp={ user } />
      </Flex>
    </Flex>
  );
};

export default AdminChat;
