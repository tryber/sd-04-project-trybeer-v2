import React from 'react';
import {
  Center,
  Flex,
  Heading,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
// Helper Component
const Header = ({ children, text }) => (
  <Flex bg="basegreen" color="white" h="60px">
    <Center w="100px">
      {children}
    </Center>
    <Center w="full" pr="60px">
      <Heading size="sm" data-testid="top-title">{text}</Heading>
    </Center>
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
