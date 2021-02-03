import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';
import MenuAdmin from '../../../components/MenuAdmin';
import { getChatUsers } from '../../../api';
import ChatCard from '../../../components/ChatCard';

const AdminChat = () => {
  const history = useHistory();
  const [data, setData] = useState();
  useEffect(() => {
    if (!localStorage.user) history.push('/login');
    getChatUsers()
      .then((chatData) => { setData(chatData.data); })
      .catch((err) => console.log(err));
  }, [history, setData]);

  const printChats = (userArray) => {
    if (userArray.length > 0) return userArray.map((e) => <ChatCard data={ e } key={ e.id } />);
    return <Text data-testid="text-for-no-conversation">Nenhuma conversa por aqui</Text>;
  };
  return (
    <Flex direction="row" h="100vh">
      <MenuAdmin />
      <Flex direction="column">
        {data ? (printChats(data)) : (
          <Text>Loading...</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default AdminChat;
