import React from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import Links from './Links';
import Header from './Header';
import LinkBtn from '../LinkBtn';

const MenuClient = ({ header }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box boxShadow="lg" position="fixed" w="full" zIndex={ 2 }>
      <Header text={ header }>
        <IconButton variant="outline" border="0px" onClick={ onOpen } icon={ <HamburgerIcon boxSize={ 7 } /> } data-testid="top-hamburguer" />
      </Header>
      <Flex id="modalContainer">
        <Drawer
          isOpen={ isOpen }
          placement="left"
          onClose={ onClose }
          getContainer={ () => document.getElementById('modalContainer') }
        >
          <DrawerOverlay />
          <DrawerContent bg="basegreen">
            <DrawerCloseButton color="white" fontSize="xl" m={ 1 } />
            <DrawerHeader className="side-menu-container" color="white" fontFamily="logo" fontSize="28px">Menu</DrawerHeader>
            <DrawerBody>
              <Links />
            </DrawerBody>
            <DrawerFooter>
              <LinkBtn route="/login" testid="side-menu-item-logout">
                Sair
              </LinkBtn>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
export default MenuClient;

MenuClient.propTypes = {
  header: PropTypes.string,
};

MenuClient.defaultProps = {
  header: 'client',
};
