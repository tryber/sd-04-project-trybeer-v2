import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// import Header from '../../components/Header';
import MessageList from '../../components/MessageList';

import SideMenuAdmin from '../../components/SideMenuAdmin';

import './styles.css';

const socket = io('http://localhost:3001');

const AdminChatList = () => {
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket.emit('messageList');
    socket.on('allMessages', (msgs) => {
      if (msgs) localStorage.setItem('room', msgs.room);
      setAllMessages(msgs);
    });
  }, []);

  return (
    <article className="container">
      <aside>
        <SideMenuAdmin />
      </aside>
      <section className="messages-container ">
        {/* <h1 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h1> */}
        <ul className="messages" data-testid="containerChat">
          {!allMessages ? (
            <div data-testid="text-for-no-conversation">
              Nenhuma conversa por aqui
            </div>
          ) : (
            <div>
              <h1>Conversas</h1>
              <MessageList
                user={ allMessages.room }
                clock={ allMessages.timestamp }
              />
            </div>
          )}
        </ul>
      </section>
    </article>
  );
};

// MyOrdersADM.propTypes = {
//   orders: PropTypes.shape({
//     id: PropTypes.number,
//     deliveryAdress: PropTypes.string,
//     deliveryNumber: PropTypes.number,
//     status: PropTypes.string,
//     totalPrice: PropTypes.number,
//   }).isRequired,
// };

export default AdminChatList;
