const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const routes = require('./routes');
const { users } = require('./models');
const chatModel = require('./chatModel/chatModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, './public/images')));
app.use(routes);

io.on('connection', async (socket) => {
  console.log(`O socket ${socket.id}, foi conectado!`);

  socket.on('render', async (user) => {
    const history = await chatModel.registeredHistoric(user);
    // console.log(history, 'AQUI HISTORIC');
    socket.emit('renderInit', history);
  });

  const showMessages = async () => {
    const nicknames = [];
    // Criando lista de nomes dos usuários cadastrados no BD SQL
    const nameList = await users.findAll({});
    nicknames.push('Loja');

    nameList.forEach((item) => nicknames.push(item.dataValues.email));
    const filterNicknames = nicknames.filter(
      (nickname) => nickname !== 'tryber@trybe.com.br',
    );

    const allHistoric = await chatModel.findAllHistoric();
    /*     console.log(allHistoric, 'ALL HISTORIC'); */

    console.log(nicknames, 'AQUI NICKNAMES');
    const makeList = (nome) => {
      const msgByName = [];
      allHistoric.forEach((msg) => {
        if (msg.nickname === nome) {
          msgByName.push(msg);
        }
      });
      return msgByName;
    };

    const listMsgName = [];
    filterNicknames.forEach((name) => {
      // console.log(makeList(name), 'AQUI SAÍDA DA FUNÇÃO MAELIST');
      listMsgName.push(makeList(name));
    });

    console.log(listMsgName, 'aqui msg BY NICKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');
    return listMsgName;
  };

  socket.on('message', async (mensagem) => {
    // console.log(mensagem, 'MENSAGEM');

    const time = new Date();
    const timestamp = moment(time).format('HH:mm');

    chatModel.registerData(mensagem, timestamp);

    io.emit('renderMessage', mensagem, timestamp);

    io.emit('listByName', await showMessages());

    console.log(mensagem, 'HHHHHHHHHHHHHHH');
  });

  socket.on('showAllMessages', async () => {
    socket.emit('listByName', await showMessages());
  });

  socket.on('disconnect', () => {
    console.log(`O socket ${socket.id} desconectou :(`);
  });
});

io.on('error', (error) => {
  console.log('Erro no socket', error.message);
});

const PORT = 3001;

http.listen(PORT, () => console.log('listening on port ', PORT));
