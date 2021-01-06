import React from 'react'

function Message({ msg: { text, nickname, time, itsMe} }) {
  return (
    <div className={`msg ${itsMe ? 'itsMe' : ''}`}>
      <div className="arrow"></div>
      <div className="msg-info">
        <span className="msg-name">{ nickname }</span>
        <span className="msg-text">{ text }</span>
        <span className="msg-time">{ time }</span>
      </div>
    </div>
  )
}

export default Message
