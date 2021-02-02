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

  socket.on('message', (mensagem) => {
   // console.log(mensagem, 'MENSAGEM');
    const time = new Date();
    const timestamp = moment(time).format('HH:mm');

    chatModel.registerData(mensagem, timestamp);

    io.emit('renderMessage', mensagem, timestamp);
  });

  socket.on('showAllMessages', async () => {
    // CRIAR UMA busca de mensagens com base no nome dos usuários no model
    // Criar um for na lista de nomes, e à partir disso, para cada usuário,
    // chamar a função de busca de mensagens, certo!
    // Guardar a mensagem de cada usuário numa var, dessa var pegar o último
    // item da lista(última msg enviada, nome e horário)
    // Criar um card para cada com o nome e horário, renderizar os cards
    // creio que será mais fácil por collection para cada usuário, pois
    // criarei uma função de busca genérica onde o nome da collection será o nome do user

    const nicknames = [];
    // Criando lista de nomes dos usuários cadastrados no BD SQL
    const nameList = await users.findAll({});

    nameList.forEach((item) => nicknames.push(item.dataValues.email))
    nicknames.filter(() => nicknames !== 'tryber@trybe.com.br')

    console.log('AQUI NICKNAMES!!!!!!!', nicknames );

    const messageFromName = [];
    for (let i = 0; i < nameList.length; i++) {
      messageFromName.push(await chatModel.registeredHistoric(nicknames[i]))
    }

    console.log(messageFromName, 'aqui MESSAGE FROM NAME');

    socket.emit('listByName', messageFromName);
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
