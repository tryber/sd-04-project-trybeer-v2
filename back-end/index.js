const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const routes = require('./routes');
const { saveMessage, getMessages } = require('./model/message');

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
  const oldMessages = await getMessages();
  io.emit('oldMessages', oldMessages);

  socket.on('message', async ({ email, message }) => {
    const newDate = new Date();
    const now = newDate.toLocaleString([], { hour12: false }).substr(11, 5);
    await saveMessage(now, message, email);
    const composeMessage = { email, now, message };
    console.log('composeMessage', composeMessage);
    io.emit('newMessage', composeMessage);
  });

  socket.on('disconnect', () => {
    console.log('Desconectado');
  });
});

server.listen(port, () => console.log(`App listening on port ${port}!`));
