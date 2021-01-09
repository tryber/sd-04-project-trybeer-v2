const http = require('http');
const socketIo = require('socket.io');
const app = require('../app');
const { createMessage } = require('./chatHelpers');

const server = http.Server(app);

const io = socketIo(server);

const { USER_CONNECTED, MESSAGE_SENT, MESSAGE_RECEIVED } = require('./events');

const usersOnline = [];

io.on('connection', async (socket) => {
  socket.on(USER_CONNECTED, (user) => {
    const userObj = user;
    userObj.socketId = socket.id;

    usersOnline.push(userObj);
  });

  socket.on(MESSAGE_SENT, ({ message, username }) => {
    const formatedMsg = createMessage(message, username);

    io.emit(MESSAGE_RECEIVED, formatedMsg);
  });
});

module.exports = server;
