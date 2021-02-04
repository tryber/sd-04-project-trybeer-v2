const userServoce = require('../services/userService');
const db = require('../models');

const req = {
  userName: 'Rubinho Barrichello',
  email: 'costaleo122@gmail.com',
  password: '123456',
};

describe('Sua aplicação deve ter o endpoint POST `/register`', () => {
  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  it('Será testado se o usuario já existe', async () => {
    req.body = req;
    const user = await userServoce.createUser(req);

    expect(user).toStrictEqual({ message: 'E-mail already in database.' });
  });

  it('Será testado se o login e executado corretamente', async () => {
    req.body = req;
    await userServoce.login(req);
  });

  it('Será testado se o login retorna nulo', async () => {
    req.body = { email: 'tryber@trybe.com.br', password: '97845612' };
    await userServoce.login(req);
  });
});
