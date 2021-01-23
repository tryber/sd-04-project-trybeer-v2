const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;

app.use('/images', express.static('images'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes.userRoutes, routes.productsRoutes);

io.on('connection', (socket) => {
  try {
    console.log('Conectado');

    socket.on('message', ({ email, message }) => {
      const newDate = new Date();
      const now = newDate.toLocaleString([], { hour12: false }).substr(11, 5);
      const composeMessage = { email, now, message};
      io.emit('newMessage', composeMessage);
    })

    socket.on('disconnect', () => {
      console.log('Desconectado');
    })
  } catch (e) {
    console.log(e.message);
  }
})

server.listen(port, () => console.log(`App listening on port ${port}!`));
