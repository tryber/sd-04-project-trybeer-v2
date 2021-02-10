import React from 'react';
import PropTypes from 'prop-types';

const MessageBox = ({ user, clock, content }) => (
  <div className="messagebox-client">
    <p data-testid="nickname">{user}</p>
    <p data-testid="message-time">{clock}</p>
    <p data-testid="text-message">{content}</p>
  </div>
);

MessageBox.propTypes = {
  user: PropTypes.string.isRequired,
  clock: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default MessageBox;
