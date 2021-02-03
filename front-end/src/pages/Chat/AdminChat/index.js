import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex /* , Text */ } from '@chakra-ui/react';
import MenuAdmin from '../../../components/MenuAdmin';

const AdminChat = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.user) history.push('/login');
  }, [history]);
  return (
    <Flex direction="row" h="100vh">
      <MenuAdmin />
      {/* <Flex direction="column">
        {chats ? (
          chats.map((e) => <OrderCard order={ e } userRole={ role } key={ e.id } />)
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex> */}
    </Flex>
  );
};

export default AdminChat;
