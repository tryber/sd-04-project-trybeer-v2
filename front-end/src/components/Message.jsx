import React from 'react';
import PropTypes from 'prop-types';

export default function Message({ msg: { text, nickname, time }, itsMe }) {
  return (
    <div className={`msg ${ itsMe ? 'itsMe' : '' }`}>
      <div className="arrow"></div>
      <div className="msg-info">
        <span className="msg-name">{ nickname }</span>
        <span className="msg-text">{ text }</span>
        <span className="msg-time">{ time }</span>
      </div>
    </div>
  )
}

Message.propTypes = {
  itsMe: PropTypes.bool,
  msg: PropTypes.shape({
    text: PropTypes.string,
    nickname: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
};