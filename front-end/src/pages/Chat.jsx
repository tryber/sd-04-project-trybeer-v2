import React/*  , { useEffect } */ from 'react';
//  import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import TopBar from '../components/ClientBar';

//  import SideBar from '../components/ClientBar.jsx';

const socket = io('http://localhost:3001');

const Chat = () => {
  //  const history = useHistory();
  const loginInStorage = JSON.parse(localStorage.getItem('user'));

  if (loginInStorage.role === 'client') {
    //  console.log(loginInStorage);

    const renderInit = async (data) => {
      const chat = document.getElementById('chat');

      data.forEach((item) => {
        //  console.log('pass');
        const msgLine = document.createElement('p');

        const dateLine = document.createElement('p');
        const nick = document.createElement('p');
        const bloco = document.createElement('div');

        msgLine.setAttribute('data-testid', 'text-message');
        msgLine.setAttribute(
          'class',
          'border border-info border-5 border-end-0 rounded-start',
        );

        dateLine.innerHTML = item.date;

        msgLine.innerHTML = item.chatMessage;

        nick.innerHTML = item.sender;

        bloco.append(nick);
        bloco.append(dateLine);
        bloco.append(msgLine);

        chat.append(bloco);
      });
    };

    socket.emit('render', loginInStorage.userEmail);

    socket.on('renderInit', async (data) => {
      renderInit(data);
    });

    socket.on('goAway', (/* data */) => {
      //  console.log(data);
    });

    socket.on('renderMessage', (data, time) => {
      const chat = document.getElementById('chat');
      //  console.log(data)
      const msgLine = document.createElement('p');
      const dateLine = document.createElement('p');
      const nick = document.createElement('p');
      const bloco = document.createElement('div');

      msgLine.setAttribute('data-testid', 'text-message');
      nick.setAttribute('data-testid', 'nickname');
      dateLine.setAttribute('data-testid', 'message-time');
      msgLine.setAttribute(
        'class',
        'border border-info border-5 border-end-0 rounded-start',
      );

      dateLine.innerHTML = time;
      //  console.log(dateLine);

      msgLine.innerHTML = data.chatMessage;

      nick.innerHTML = data.sender;

      bloco.append(nick);
      bloco.append(dateLine);
      bloco.append(msgLine);

      chat.append(bloco);
    });

    // AGORA TENHO QUE CRIAR A LÓGICA PARA APENAS COLOCAR NOVOS NOMES NO BD E TBM NA LISTA ATUAL

    const sendMessage = async () => {
      //  const nameUser = document.getElementById('userName');

      //  console.log('entrou aqui no sendMessage');
      const inputMsg = document.getElementById('messageInput');

      const chatMessage = inputMsg.value;
      const nickname = loginInStorage.userEmail;

      socket.emit('message', { chatMessage, nickname, sender: nickname });
    };

    return (
      <div>
        <TopBar title="Chat da loja" isAdm={ false } />
        <div className="container">
          <br />
          <div id="chat" className="mb-3" />
          <br />

          <input
            type="text"
            className="form-control form-control-lg"
            data-testid="message-input"
            id="messageInput"
          />
          <br />
          <button
            type="button"
            className="btn btn-outline-success"
            id="sendButton"
            data-testid="send-message"
            onClick={ () => sendMessage() }
          >
            Enviar
          </button>
          <hr />
          <br />
        </div>
      </div>
    );
  }

  return null;
};

export default Chat;
