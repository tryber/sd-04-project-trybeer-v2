import React from 'react';
import {
  Center, Flex, Spacer, Text,
} from '@chakra-ui/react';

import LinkBtn from '../LinkBtn';

const MenuAdmin = () => (
  <Flex
    className="admin-side-bar-container"
    direction="column"
    maxW="xs"
    h="100vh"
    bg="black"
    color="white"
    pl={ 3 }
  >
    <Center mb={ 6 } pt={ 4 }>
      <Text>TryBeer</Text>
    </Center>
    <Flex direction="column" justify="space-between" h="90vh">
      <Flex direction="column">
        <LinkBtn route="/admin/orders" testid="side-menu-item-orders">
          Pedidos
        </LinkBtn>
        <LinkBtn route="/admin/profile" testid="side-menu-item-profile">
          Perfil
        </LinkBtn>
      </Flex>
      <Spacer />
      <LinkBtn route="/login" testid="side-menu-item-logout">
        Sair
      </LinkBtn>
    </Flex>
  </Flex>
);
export default MenuAdmin;
