import React from 'react';
import {
  Center,
  Flex,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
// Helper Component
const Header = ({ children, text }) => (
  <Flex bg="black" color="white" justify="space-between">
    <Center w="100px">
      {children}
    </Center>
    <Center w="100px">
      <Text data-testid="top-title">{text}</Text>
    </Center>
    <Center w="100px" />
  </Flex>
);

export default Header;

Header.propTypes = {
  children: PropTypes.string,
  text: PropTypes.string,
};

Header.defaultProps = {
  children: 'TryBeer',
  text: 'client',
};
