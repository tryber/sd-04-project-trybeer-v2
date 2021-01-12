import React from 'react';
import {
  Box, Text,
} from '@chakra-ui/react';
import MenuClient from '../../../components/MenuClient';

const ClientChat = () => {
  return (
    <Box>
      <MenuClient header="Chat da loja" />
      <Text>ClientChat - Conversas com a loja</Text>
    </Box>
  );
};

export default ClientChat;
