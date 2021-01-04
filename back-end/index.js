const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(routes);
app.use('/images', express.static(path.join(__dirname, './public/images')));

const PORT = 3001;

app.listen(PORT, () => console.log('listening on port ', PORT));
