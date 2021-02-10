import React /*  , { useEffect } */ from 'react';
//  import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import TopBar from '../components/ClientBar';

const moment = require('moment');
//  import SideBar from '../components/ClientBar.jsx';

const socket = io('http://localhost:3001');

const Chat = () => {
  const loginInStorage = JSON.parse(localStorage.getItem('user'));

  const [bigData, setBigData] = useState();

  if (loginInStorage.role === 'client') {
    const renderInit = async (data) => {
/*       setBigData(data)

      if(bigData) {
        return null;
      } */

      // primeira renderização a partir dos dados recebidos em renderInit
      const chat = document.getElementById('chat');

      data.forEach((item) => {
        const msgLine = document.createElement('div');

        const dateLine = document.createElement('p');
        const nick = document.createElement('div');
        const article = document.createElement('article');
        const msgBody = document.createElement('div');
        const msg = document.createElement('div');
        msg.setAttribute('class', 'columns');

        item.sender === 'Loja'
          ? article.setAttribute('class', 'message is-link is-4 is-offset-8')
          : article.setAttribute('class', 'message is-warning');

        msgLine.setAttribute('data-testid', 'text-message');
        msgBody.setAttribute('class', 'message-body');

        dateLine.innerHTML = item.date;
        msgLine.innerHTML = item.chatMessage;

        msgBody.append(msgLine);
        msgBody.append(dateLine);

        nick.setAttribute('class', 'message-header');
        nick.innerHTML = item.sender;

        msg.append(nick);
        msg.append(msgBody);
        article.append(msg);

        chat.append(article);
      });
    };

    socket.emit('render', loginInStorage.userEmail); // primeira chamada render recebe os dados no renderInit abaixo

    socket.on('renderInit', async (data) => {
      renderInit(data);
    });

    const renderLive = (data, sender, time) => {
      const chat = document.getElementById('chat');

      //  console.log('pass');
      const msgLine = document.createElement('div');

      const dateLine = document.createElement('p');
      const nick = document.createElement('div');
      const article = document.createElement('article');
      const msgBody = document.createElement('div');
      const msg = document.createElement('div');
      msg.setAttribute('class', 'columns');

      data.sender === 'Loja'
        ? article.setAttribute('class', 'message is-info is-4 is-offset-8')
        : article.setAttribute('class', 'message is-warning');

      msgLine.setAttribute('data-testid', 'text-message');
      msgBody.setAttribute('class', 'message-body');

      dateLine.innerHTML = time;
      msgLine.innerHTML = data;

      msgBody.append(msgLine);
      msgBody.append(dateLine);

      nick.setAttribute('class', 'message-header');
      nick.innerHTML = sender;

      msg.append(nick);
      msg.append(msgBody);
      article.append(msg);

      chat.append(article);
    };

    // AGORA TENHO QUE CRIAR A LÓGICA PARA APENAS COLOCAR NOVOS NOMES NO BD E TBM NA LISTA ATUAL

    const sendMessage = async () => {


      const inputMsg = document.getElementById('messageInput');

      const chatMessage = inputMsg.value;
      const nickname = loginInStorage.userEmail;

      const time = new Date();
      const timestamp = moment(time).format('HH:mm');

      renderLive(chatMessage, nickname, timestamp);
      socket.emit('message', { chatMessage, nickname, sender: nickname });
    };

    return (
      <div>
        <TopBar title="Chat da loja" isAdm={false} />
        <div className="container">
          <br />
      

          <div id="chat" className="mb-3" />
          <br />

          <input
            type="text"
            className="input is-primary"
            breakpoint="mobile"
            data-testid="message-input"
            id="messageInput"
          />
          <br />
          <div>
            <br></br>
            <button
              type="button"
              className="button is-primary"
              id="sendButton"
              data-testid="send-message"
              onClick={() => sendMessage()}
            >
              Enviar
            </button>
          </div>
          <hr />
          <br />
        </div>
      </div>
    );
  }

  return null;
};

export default Chat;
