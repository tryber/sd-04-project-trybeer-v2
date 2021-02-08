import { string } from 'prop-types';
import React from 'react';
import styles from './index.module.css';

const Message = ({ username, time, message }) => (
  <li className={ styles.senderMessageBalloon }>
    <span data-testid="nickname">{username}</span>
    {' '}
    -
    <span data-testid="message-time">{time}</span>
    :
    {' '}
    <span data-testid="text-message">{message}</span>
  </li>
);

Message.propTypes = {
  username: string.isRequired,
  time: string.isRequired,
  message: string.isRequired,
};

export default Message;
