const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/userRouters');
const profileRouter = require('./routers/profileRouter');
const productRouter = require('./routers/productRouters');
const ordersRouter = require('./routers/ordersRouter');
const checkoutRouter = require('./routers/checkoutRouter');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/images', express.static('images'));

app.use('/', userRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/profile', profileRouter);
app.use('/orders', ordersRouter);

app.listen(port, () => console.log('API rodando na porta 3001!'));
