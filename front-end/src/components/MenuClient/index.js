import React from 'react';
import {
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
    <>
      <Header text={ header }>
        <IconButton variant="outline" border="0px" onClick={ onOpen } icon={ <HamburgerIcon /> } data-testid="top-hamburguer" />
      </Header>
      <Flex id="modalContainer">
        <Drawer
          isOpen={ isOpen }
          placement="left"
          onClose={ onClose }
          getContainer={ () => document.getElementById('modalContainer') }
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader className="side-menu-container">Create your account</DrawerHeader>
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
    </>
  );
};
export default MenuClient;

MenuClient.propTypes = {
  header: PropTypes.string,
};

MenuClient.defaultProps = {
  header: 'client',
};
