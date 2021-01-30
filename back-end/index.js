const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const routes = require('./routes');

const chatModel = require('./chatModel/chatModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, './public/images')));
app.use(routes);

io.on('connection', async (socket) => {
  console.log(`O socket ${socket.id}, foi conectado!`);

  socket.on('render', async () => {
    const history = await chatModel.registeredHistoric();
    console.log(history);
    socket.emit('renderInit', history);
  });

  socket.on('message', (mensagem) => {
    console.log(mensagem);
    const time = new Date();
    const timestamp = moment(time).format('HH:mm');

    chatModel.registerData(mensagem, timestamp);

    io.emit('renderMessage', mensagem, timestamp);
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
