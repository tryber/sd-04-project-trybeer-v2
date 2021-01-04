const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3001;

app.use('/images', express.static('images'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes.userRoutes, routes.productsRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
