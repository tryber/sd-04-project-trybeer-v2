const { users } = require('../models');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const moment = require('moment');

const { GenerateToken } = require('../utils/GenerateToken');
const { transport: mailer } = require('../modules/mailer');

const Login = async (email, passwordParam) => {
  const user = await users.findOne({ where: { email } });

  if (!user) throw new Error('User not found');

  const {
    password,
    createdAt,
    updatedAt,
    passwordResetToken,
    passwordResetExpires,
    ...userData
  } = user.dataValues;

  if (!(await bcryptjs.compare(password, passwordParam))) {
    throw new Error('Invalid password');
  }

  return { userData, token: GenerateToken(userData) };
};

const forgotPassword = async (email) => {
    const user = await users.findOne({ where: { email } });
    
    if (!user) throw new Error('User not found');
    
    const { id } = user.dataValues;

    const token = crypto.randomBytes(20).toString('hex');

    await users.update({
      passwordResetToken: token,
      passwordResetExpires: moment().add(1, 'hours').toDate(),
    }, { where: { id } });

    mailer.sendMail(
      {
        to: 'f.c.l.p.j.fc@gmail.com',
        from: 'f.c.l.p.j.fc@gmail.com',
        html: `<b>Hey there! </b><br> você esqueceu sua senha utilize esse token: ${token} para redefini-la`,
      },
      error => {
        if (error) {
          throw new Error('Fail');
        }

        throw new Error('Fail');
      },
    );

    return { message: 'token enviado com sucesso' };
};

const resetPassword = async (email, token, password) => {
 
  const user = await users.findOne({ where: { email } });

  if (!user) throw new Error('User not found');

  const { id, passwordResetExpires, passwordResetToken } = user.dataValues;

  if (token !== passwordResetToken) {
    throw new Error('token invalid');
  }

  if (moment().toDate() > passwordResetExpires) {
    throw new Error('token expired');
  }

  await users.update({ password: await bcryptjs.hash(password, 10) }, { where: { id } });

  return { message: 'senha atualizada com sucesso' };
};

module.exports = { Login, forgotPassword, resetPassword };
