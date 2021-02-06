import React from 'react';
import {
  Button,
  Container,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ChatCard = ({ data }) => {
  const { userEmail, lastMsg } = data;
  return (
    <Button
      border="1px solid black"
      borderRadius="5px"
      mb={ 2 }
      maxWidth="60ch"
      type="button"
    >
      <Container>
        <Flex
          direction="column"
          data-testid="containerChat"
        >
          <Flex>
            <Text
              fontWeight="bold"
              data-testid="profile-name"
            >
              { userEmail }
            </Text>
            <Spacer />
            <Text data-testid="last-message">
              Última mensagem às
              {' '}
              {lastMsg}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Button>
  );
};

export default ChatCard;

ChatCard.propTypes = {
  data: PropTypes.shape({
    userEmail: PropTypes.string,
    lastMsg: PropTypes.string,
  }),
};

ChatCard.defaultProps = {
  data: {
    userEmail: 'teste@teste.com',
    lastMsg: '00:00',
  },
};
