require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const salesProductsController = require('./controllers/salesProductsController');

const HTTP_SERVER_PORT = 3001;
const SOCKET_PORT = 8080;

const chatModel = require('./socket/chatModel');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/users', usersController);
app.use('/login', loginController);
app.use('/products', productsController);
app.use('/sales', salesController);
app.use('/order-details', salesProductsController);

app.listen(HTTP_SERVER_PORT, () => console.log(`Server listening on port ${HTTP_SERVER_PORT}`));

const socketIoServer = http.createServer();
const io = socketIo(socketIoServer);

io.on('connection', async (socket) => {
  console.log('User connected', `${socket.id}`);

  const messages = await chatModel.getMessages();
  socket.emit('messagesHistory', messages);

  socket.on('saveMessage', async (payload) => {
    const { messageText, nickname } = payload;
    const result = await chatModel.saveMessage(messageText, nickname);
    io.emit('message', result);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

socketIoServer.listen(SOCKET_PORT, () => console.log(`Socket listening on port ${SOCKET_PORT}`));
