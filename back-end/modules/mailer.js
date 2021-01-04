const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const  path = require('path');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '9b38eef005254e',
    pass: 'ac983e9190ed88',
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
  }),
);

module.exports = { transport };
