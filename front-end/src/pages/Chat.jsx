import React from 'react';
import SideBar from '../components/ClientBar.jsx';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = () => {
  const history = useHistory();
  const loginInStorage = JSON.parse(localStorage.getItem('user'));

  const nameUser = document.getElementById('userName');
  const chat = document.getElementById('chat');
  const listOfNames = document.getElementById('listOfNames');

  const namesList = [];

  /*   const renderInit = async (data) => {
    data.forEach((item) => {
      let formItem = `${item.date} - ${item.nickname} : ${item.chatMessage}`;

      let msgLine = document.createElement('p');
      msgLine.setAttribute('data-testid', 'message');
      msgLine.setAttribute(
        'class',
        'border border-info border-5 border-end-0 rounded-start'
      );
      msgLine.innerHTML = formItem;

      chat.append(msgLine);
    });
  };

  socket.on('renderInit', (data) => {
    console.log(data);
    renderInit(data);
  });

  socket.on('renderNames', (name) => {
    console.log(name);
    makeListOfName(name);
  });

  socket.on('goAway', (data) => {
    console.log(data);
  });

  socket.on('message', (data) => {
    let msgLine = document.createElement('p');
    msgLine.setAttribute('data-testid', 'message');
    msgLine.setAttribute(
      'class',
      'border border-info border-5 border-end-0 rounded-start'
    );
    msgLine.innerHTML = data;

    chat.append(msgLine);
  });

  //AGORA TENHO QUE CRIAR A LÓGICA PARA APENAS COLOCAR NOVOS NOMES NO BD E TBM NA LISTA ATUAL

  const makeListOfName = (names) => {
    names.forEach((item) => {
      const itemName = document.createElement('li');
      itemName.setAttribute('data-testid', 'online-user');
      itemName.innerHTML = item.name;
      listOfNames.appendChild(itemName);
    });
  };

  const showAlert = () => {
    alert('Este nome já existe');
  };

  socket.on('insertTheName', (name) => {
    console.log();
    const itemName = document.createElement('li');
    itemName.setAttribute('data-testid', 'online-user');
    itemName.innerHTML = name;
    listOfNames.appendChild(itemName);
  });

  const verifyNameLenght = (name) => {
    if (name.length < 1) {
      return alert('Digite um nome válido');
    }
    {
      verifyNameExists(name);
    }
  };

  const insertNameOnList = (name) => {
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
    // Função do botão
    let realName = nameUser.value;
    await verifyNameLenght(realName);
  };

  const sendMessage = async () => {
    // console.log('entrou aqui no sendMessage');
    let inputMsg = document.getElementById('messageInput');

    const chatMessage = inputMsg.value;
    const nickname = nameUser.value;

    socket.emit('message', { chatMessage, nickname }); */

  return (
    <div className="container">
      <div className="bodyAdm">
        <div className="container">
          <h3>Usuários conectados</h3>
          <ul id="listOfNames"></ul>
        </div>

        <br />
        <h1>webChat</h1>
        <div id="chat"></div>
        <br />
        <label for="nameInput">Name</label>
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
          onclick="saveName()"
        >
          Save
        </button>
        <br />
        <br />

        <input
          type="text"
          className="form-control form-control-lg"
          data-testid="message-box"
          id="messageInput"
        />
        <br />
        <button
          className="btn btn-outline-success"
          id="sendButton"
          data-testid="send-button"
          onclick="sendMessage()"
        >
          Enviar
        </button>
        <hr />
        <br />
      </div>
    </div>
  );
};

export default Chat;
