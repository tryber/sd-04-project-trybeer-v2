import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';

const MessageList = ({ user, clock }) => (
  <div className="ordereds-info">
    <Link to="/admin/chat" className="list-link">
      <div className="container-message">
        <p data-testid="profile-name">{user}</p>
        <p data-testid="last-message">
          Última mensagem às
          {clock}
        </p>
      </div>
    </Link>
  </div>
);

MessageList.propTypes = {
  user: PropTypes.string.isRequired,
  clock: PropTypes.string.isRequired,
};

export default MessageList;
