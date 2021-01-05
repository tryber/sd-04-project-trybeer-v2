const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const middleware = require('./middleware');
const controllers = require('./controllers');
require('dotenv/config');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// caminho da pasta que disponibiliza as imagens
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post(
  '/login',
  middleware.validations.loginValidation,
  controllers.login.userLogin,
);

app.post('/register', middleware.validations.registerValidation, controllers.user.userRegister);

app.post('/orders', controllers.sale.saleRegister);
app.get('/orders', controllers.sale.getAllUserSales);

app.get('/products', controllers.products.getAllProducts);

app.put('/profile', controllers.user.userUpdate);

app.get('/orders/:id', controllers.sale.getDetailsSales);

app.get('/admin/orders', controllers.sale.getSales);

app.put('/admin/orders/:id', controllers.sale.setStatusAsDelivered);

app.use((err, _req, res, _next) => {
  // console.log(err)
  res.status(405).json({ err: err.message });
});

httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
