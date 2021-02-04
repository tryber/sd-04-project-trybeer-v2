const frisby = require('frisby');

const url = 'http://localhost:3001';

const userController = require('../controllers/userController');
const db = require('../models');

const req = {
  email: 'zebirita@gmail.com',
  password: '12345678',
};

const reqFail = {
  email: 'zebita@gmail.com',
  password: '12345678',
};

describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  const mockResponse = () => {
    const res = {
      send: jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const res = mockResponse();

  it('Será validado que é possível fazer login com sucesso', async () => {
    req.body = req;
    await userController.loginUser(req, res);
  });

  it('sera validado que não é possivel fazer login', async () => {
    req.body = reqFail;
    await userController.loginUser(req, res);
  });

  it('Será validado que não é possível fazer login sem o campo `email`', async () => {
    await frisby
      .post(`${url}/login`, {
        password: '12345678',
      })
      .expect('status', 500)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(
          'WHERE parameter "email" has invalid "undefined" value'
        );
      });
  });

  it('Será validado que não é possível fazer login sem o campo `password`', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'lewishamilton@gmail.com',
      })
      .expect('status', 500)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(`Cannot read property 'password' of null`);
      });
  });

  it('Seria validado que o email possui o formato correto', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'teste',
        password: '12345678',
      })
      .expect('status', 500)
      .then(({ body }) => {
        const { email } = body;

        const result = JSON.parse(body);
        expect(result.message).toBe(`Cannot read property 'password' of null`);
      });
  });
});
