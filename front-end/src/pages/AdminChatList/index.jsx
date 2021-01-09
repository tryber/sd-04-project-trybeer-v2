import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import api from '../../services/api';

const AdminChatList = () => {
  const [chat, setChat] = useState([]);
  useEffect(async () => {
    const result = await api.getAllMessages();
    const data = await result.data;
    console.log(data);

    setChat(data);
  }, []);

  /* const getLastDate = (arr) => {
    const last = arr[arr.length - 1];

    return last.date;
  }; */

  return (
    <div>
      <Menu nomeTela="Conversas" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        {chat.message
          ? <h1 data-testid="text-for-no-conversation">{chat.message}</h1>
          : chat.map(({ email, timestamp }) => (
            <div data-testid="containerChat" key={ email }>
              <h1 data-testid="profile-name">{email}</h1>
              <h2 data-testid="last-message">
                Última mensagem às
                {' '}
                {timestamp}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminChatList;
