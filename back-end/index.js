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

io.on('connection', (socket) => {
  console.log('---- Conectado ----');
  console.log('BackEnd', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message: ', msg);
  });

  console.log('---- x ----');
});

app.listen(port, () => console.log(`app - Listening on port ${port}`));

server.listen(chatPort, () => console.log(`Server - Listening on port ${chatPort}`));
