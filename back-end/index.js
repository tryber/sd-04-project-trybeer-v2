require('dotenv').config();

const express = require('express');

const app = express();
const path = require('path');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const cors = require('cors');
const route = require('./routes');
const mongoMessage = require('./services/mongoMessage');

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());
app.use('/login', route.loginRouter);
app.use('/register', route.registerRouter);
app.use('/products', route.productsRouter);
app.use('/profile', route.profileRouter);
app.use('/sales', route.salesRouter);
app.use('/admin', route.adminRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((error, _req, res, _next) => {
  const { message, status } = error;
  if (status < 500) {
    return res.status(status).json(message);
  }
  res.status(500).send(message);
});

io.on('connection', (socket) => {
  console.log('connection', socket.handshake.query.clientId);
  socket.emit('event_name', {
    data: 'hello world',
  });

  socket.on('message', async (payload) => {
    console.log(payload);
    await mongoMessage.storeMessage(payload);
  });

  socket.on('getAllMessages', async () => {
    const allChats = await mongoMessage.getAllMessages();
    console.log('allMessages from socket message: ', allChats);
    socket.emit('SendAllMessages', {
      allChats,
    });
  });
});

http.listen(PORT, () => {
  console.log(`Http Listening PORT ${PORT}`);
});
