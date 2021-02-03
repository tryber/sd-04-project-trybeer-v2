import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import AdminChat from './AdminChat';
import ClientChat from './ClientChat';
import MenuClient from '../../components/MenuClient';

const Chat = () => {
  const [user, setUser] = useState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
    const { email } = jwtDecode(localStorage.user).dataValues;
    setUser(email);
  }, [history]);
  if (localStorage.user) {
    if (location.pathname === '/chat') {
      return (
        <Box>
          <MenuClient header="Chat da loja" />
          <Text>ClientChat - Conversas com a loja</Text>
          <ClientChat userProp={ user } histProp={ user } />
        </Box>
      );
    }
    return (
      <AdminChat />
    );
  }
  return <p> Loading...</p>;
};

export default Chat;
