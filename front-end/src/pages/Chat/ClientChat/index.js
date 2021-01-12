import React, { useEffect } from 'react';
import {
  Box, Text,
} from '@chakra-ui/react';
import MenuClient from '../../../components/MenuClient';
import { clientConnect } from '../../../api';

const ClientChat = () => {

  useEffect(() => {
    clientConnect();
  }, []);

  return (
    <Box>
      <MenuClient header="Chat da loja" />
      <Text>ClientChat - Conversas com a loja</Text>
    </Box>
  );
};

export default ClientChat;
