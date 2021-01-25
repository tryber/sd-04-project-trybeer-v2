import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ChatMessageCard = ({ msg }) => {
  const { nickname, time, message } = msg;
  return (
    <Box bgGradient="linear(#edf2f7, #dce6ef)" borderRadius="5px">
      <Text color="#40698c" data-testid="nickname">{ nickname }</Text>
      <Text color="#40698c" data-testid="message-time">{ time }</Text>
      <Text data-testid="text-message">{ message }</Text>
    </Box>
  );
};

ChatMessageCard.propTypes = {
  msg: PropTypes.shape({
    message: PropTypes.string,
    nickname: PropTypes.string,
    time: PropTypes.string,
  }),
};

ChatMessageCard.defaultProps = {
  msg: {
    message: 'something',
    nickname: 'someone',
    time: '00:00',
  },
};

export default ChatMessageCard;
