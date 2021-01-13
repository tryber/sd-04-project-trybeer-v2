import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import io from 'socket.io-client';
import SideBar from '../components/ClientBar.jsx';

const socket = io('http://localhost:3001');

const Chat = () => {
  const history = useHistory();
  const loginInStorage = JSON.parse(localStorage.getItem('user'));

  if (loginInStorage.role === 'client') {
    console.log(loginInStorage);

    const namesList = [];

    const renderInit = async (data) => {
      const chat = document.getElementById('chat');

      data.forEach((item) => {
        console.log(item.date);
        const msgLine = document.createElement('p');

        const dateLine = document.createElement('p');
        const nick = document.createElement('p');
        const bloco = document.createElement('div');

        msgLine.setAttribute('data-testid', 'message');
        msgLine.setAttribute(
          'class',
          'border border-info border-5 border-end-0 rounded-start',
        );

        dateLine.innerHTML = item.date;
        console.log(dateLine);

        msgLine.innerHTML = item.chatMessage;

        nick.innerHTML = item.nickname;

        bloco.append(nick);
        bloco.append(dateLine);
        bloco.append(msgLine);

        chat.append(bloco);
      });
    };

    socket.on('renderInit', async (data) => {
      console.log(data);
      renderInit(data);
    });

    /* socket.on('renderNames', (name) => {
      console.log(name);
      makeListOfName(name);
    });
   */

    socket.on('goAway', (data) => {
      console.log(data);
    });

    socket.on('renderMessage', (data, time) => {
      const chat = document.getElementById('chat');
      console.log(data);
      const msgLine = document.createElement('p');
      const dateLine = document.createElement('p');
      const nick = document.createElement('p');
      const bloco = document.createElement('div');

      msgLine.setAttribute('data-testid', 'text-message');
      msgLine.setAttribute(
        'class',
        'border border-info border-5 border-end-0 rounded-start',
      );

      dateLine.innerHTML = time;
      console.log(dateLine);

      msgLine.innerHTML = data.chatMessage;

      nick.innerHTML = data.nickname;

      bloco.append(nick);
      bloco.append(dateLine);
      bloco.append(msgLine);

      chat.append(bloco);
    });

    // AGORA TENHO QUE CRIAR A LÓGICA PARA APENAS COLOCAR NOVOS NOMES NO BD E TBM NA LISTA ATUAL

    const showAlert = () => {
      alert('Este nome já existe');
    };

    const sendMessage = async () => {
      const nameUser = document.getElementById('userName');

      console.log('entrou aqui no sendMessage');
      const inputMsg = document.getElementById('messageInput');

      const chatMessage = inputMsg.value;
      const nickname = loginInStorage.userEmail;

      socket.emit('message', { chatMessage, nickname });
    };

    return (
      <div className="container">
        <h3>Usuários conectados</h3>

        <br />
        <h1>Trybeer Chat</h1>
        <div id="chat" className="mb-3" />
        <br />

        <input
          type="text"
          className="form-control form-control-lg"
          data-testid="chat-message"
          id="messageInput"
        />
        <br />
        <button
          className="btn btn-outline-success"
          id="sendButton"
          data-testid="send-message-btn"
          onClick={ () => sendMessage() }
        >
          Enviar
        </button>
        <hr />
        <br />
      </div>
    );
  }

  return null;
};

export default Chat;

/*   socket.on('insertTheName', (name) => {
  console.log();
  const itemName = document.createElement('li');
    itemName.setAttribute('data-testid', 'online-user');
    itemName.innerHTML = name;
    listOfNames.appendChild(itemName);
  });

  const verifyNameLenght = (name) => {
    console.log('Lenght', name);
    if (name.length < 1) {
      return alert('Digite um nome válido');
    }
    {
      verifyNameExists(name);
    }
  };

  const insertNameOnList = (name) => {
    console.log('AQUI INSERT NAME', name);
    // Inserindo o nome no array
    namesList.push(name);
    socket.emit('listUsers', name);
    socket.emit('makeNameTrip', name);
  };

  const verifyNameExists = (name) => {
    let testResult = namesList.filter((item) => {
      if (item === name) return item;
    });

    if (testResult.length > 0) {
      return alert('Este nome já existe');
    }
    {
      insertNameOnList(name); // Inserindo nome na lista
    }
  };

  const saveName = async () => {
    const nameUser = document.getElementById('userName');

    // Função do botão
    let realName = nameUser.value;
    await verifyNameLenght(realName);
  }; */

{
  /* <label htmlFor="nameInput">Name</label>
  <br />
  <input
  className="form-control"
    name="nameInput"
    type="text"
    data-testid="nickname-box"
    id="userName"
    />
  <br />
  <button
  className="btn btn-primary"
    data-testid="nickname-save"
    onClick={() => saveName()}
    >
    Save
    </button>
    <br />
    <br /> */
}

/*   const makeListOfName = (names) => {
      names.forEach((item) => {
        const itemName = document.createElement('li');
        itemName.setAttribute('data-testid', 'online-user');
        itemName.innerHTML = item.name;
        listOfNames.appendChild(itemName);
      });
    }; */
