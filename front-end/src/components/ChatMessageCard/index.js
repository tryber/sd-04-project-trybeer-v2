import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ChatMessageCard = ({ msg, user }) => {
  const { content, time } = msg;
  return (
    <Box bgGradient="linear(#edf2f7, #dce6ef)" borderRadius="5px">
      <Text color="#40698c" data-testid="nickname">{ user }</Text>
      <Text color="#40698c" data-testid="message-time">{ time }</Text>
      <Text data-testid="text-message">{ content }</Text>
    </Box>
  );
};

ChatMessageCard.propTypes = {
  msg: PropTypes.shape({
    content: PropTypes.string,
    time: PropTypes.string,
  }),
  user: PropTypes.string,
};

ChatMessageCard.defaultProps = {
  msg: {
    content: 'something',
    time: '00:00',
  },
  user: 'teste@teste.com',
};

export default ChatMessageCard;
