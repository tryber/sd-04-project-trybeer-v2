import React from 'react';
import PropTypes from 'prop-types';

export default function Message({ msg: { text, nickname, time }, itsMe }) {
  return (
    <div className={ `msg ${itsMe ? 'itsMe' : ''}` }>
      <div className="arrow" />
      <div className="msg-info">
        <span className="msg-name" data-testid="nickname">{ nickname }</span>
        <span className="msg-text" data-testid="text-message">{ text }</span>
        <span className="msg-time" data-testid="message-time">{ time }</span>
      </div>
    </div>
  );
}

Message.propTypes = {
  itsMe: PropTypes.bool.isRequired,
  msg: PropTypes.shape({
    text: PropTypes.string,
    nickname: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
};
