import React from 'react';
import {
  Box, Text,
} from '@chakra-ui/react';
import MenuAdmin from '../../../components/MenuAdmin';

const AdminChat = () => {
  return (
    <Box>
      <MenuAdmin />
      <Text>AdminChat - Conversas</Text>
    </Box>
  );
};

export default AdminChat;
