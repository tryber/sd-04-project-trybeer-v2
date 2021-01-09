const http = require('http');
const socketIo = require('socket.io');
const app = require('../app');
const { createMessage } = require('./chatHelpers');

const server = http.Server(app);

const io = socketIo(server);

const { insertMessages } = require('../mongoModel/messageModel');
const { USER_CONNECTED, MESSAGE_SENT, MESSAGE_RECEIVED } = require('./events');

const usersOnline = [];

io.on('connection', async (socket) => {
  socket.on(USER_CONNECTED, (user) => {
    socket.join(user.socketId);

    console.log('user:', user);
    console.log('Room ?', socket.rooms);

    usersOnline.push(user);
  });

  socket.on(MESSAGE_SENT, async ({ message, username, socketId }) => {
    const formatedMsg = createMessage(message, username);

    io.to(socketId).emit(MESSAGE_RECEIVED, formatedMsg);
    await insertMessages(socketId, message, username, formatedMsg.time);
  });
});

module.exports = server;
