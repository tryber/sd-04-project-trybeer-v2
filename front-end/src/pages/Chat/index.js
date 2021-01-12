import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AdminChat from './AdminChat';
import ClientChat from './ClientChat';

const Chat = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
  }, [history]);
  if (localStorage.user) {
    if (location.pathname === '/chat') {
      return (
        <ClientChat />
      );
    }
    return (
      <AdminChat />
    );
  }
  return <p> Loading...</p>;
};

export default Chat;
