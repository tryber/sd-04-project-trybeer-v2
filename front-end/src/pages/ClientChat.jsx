import React from 'react';
import { connect } from 'react-redux';
// import io from 'socket.io-client';

import Menu from '../components/Menu';

// const socket = io('http://localhost:3002');

const ClientChat = () => (
  <div>
    <Menu title="TryBeer" />
    <input type="text" data-testid="message-input" />
    <button type="button" data-testid="send-message">
      Enviar
    </button>
  </div>
);

export default connect(null, null)(ClientChat);
