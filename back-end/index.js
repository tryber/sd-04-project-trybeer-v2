const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const routes = require('./routes');
const { saveMessage, getMessages, getAllMessages } = require('./model/message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;

app.use('/images', express.static('images'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes.userRoutes, routes.productsRoutes);

io.on('connection', async (socket) => {
  console.log(`${socket.id} conectado`);

  socket.on('messageList', async () => {
    const allMessages = await getAllMessages();
    // console.log('todas as mensagens', allMessages);
    // io.emit('allMessages', allMessages);
    const lastMessage = allMessages.pop();
    // console.log('ultima mensagem', lastMessage);
    io.emit('allMessages', lastMessage);
  });

  socket.on('online', async (room) => {
    const oldMessages = await getMessages(room);
    // console.log('mensagens antigas', oldMessages);
    socket.join(room);
    io.to(room).emit('oldMessages', oldMessages);
  });

  socket.on('message', async ({ userEmail, message, actualRoom }) => {
    const newDate = new Date();
    const now = await newDate.toLocaleString([], { hour12: false }).split(' ')[1].substring(0, 5);
    await saveMessage({ timestamp: now, message, nickname: userEmail, room: actualRoom });
    const composeMessage = { nick: userEmail, now, message };
    // console.log('composeMessage', composeMessage);
    io.to(actualRoom).emit('newMessage', composeMessage);
  });

  socket.on('disconnect', () => {
    console.log('Desconectado');
  });
});

server.listen(port, () => console.log(`App listening on port ${port}!`));
