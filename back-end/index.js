const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const { login } = require('./controllers/login');
const { getAll } = require('./controllers/products');
// const { validateJWT } = require('./middlewares/validateJWT');
const { register } = require('./controllers/register');
const { checkout } = require('./controllers/checkout');
const { userUpdate } = require('./controllers/profile');
const { getOrderByUserId, getAllSales } = require('./controllers/sale');
const { getDetailController, postDetailController } = require('./controllers/details');
const { addMessage, addUser, getAllUsers, getHistoryByUser } = require('./controllers/message');

const app = express();
const port = 3001;
const chatPort = 3002;

const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/images', express.static('images'));

app.post('/login', login);
app.get('/products', getAll);

app.post('/register', register);

app.post('/sales', checkout);
app.put('/profile', userUpdate);

app.get('/orders', getOrderByUserId);
app.get('/orders/:id', getDetailController);
app.get('/admin/orders', getAllSales);
app.get('/admin/orders/:id', getDetailController);
app.put('/admin/orders/:id', postDetailController);

app.get('/admin/chats', getAllUsers);

io.on('connection', (socket) => {
  console.log('---- Conectado ----');
  console.log('BackEnd ', socket.id);

  // Implementar chamada no frontend
  socket.on('checkUser', async (userEmail) => {
    const user = await addUser(userEmail);
    console.log('user: ', user);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    console.log('---- x ----');
  });

  // chamada do controller p/ add msg dentro do socket
  socket.on('message', async ({ userEmail, message }) => {
    const addmsg = await addMessage(userEmail, message);
    console.log('message: ', addmsg);
  });

  // Chamada do controller para o histórico de mensagens,
  // recebe o parâmetro 'chat' do frontend.
  socket.on('previousMessages', async (userEmail) => {
    const previousMessages = await getHistoryByUser(userEmail);
    console.log('PreviousMessages: ', previousMessages);
    io.emit('historyMessages', previousMessages);
  });
});

app.listen(port, () => console.log(`app - Listening on port ${port}`));

server.listen(chatPort, () => console.log(`Server - Listening on port ${chatPort}`));
