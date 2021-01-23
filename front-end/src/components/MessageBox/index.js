import React from 'react';

const MessageBox = ({user, clock, content}) => (
  <div>
    <p data-testid="nickname">{user}</p>
    <p data-testid="message-time">{clock}</p>
    <p data-testid="text-message">{content}</p>
  </div>
);

export default MessageBox;
