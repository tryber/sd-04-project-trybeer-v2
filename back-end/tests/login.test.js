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
  const mockResponse = () => {
    const res = {
      send: jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  const res = mockResponse();

  it('Será validado que é possível fazer login com sucesso', async () => {
    req.body = req;
    await userController.loginUser(req, res);
  });

  it('sera validado que não é possivel fazer login', async () => {
    req.body = reqFail;
    await userController.loginUser(req, res);
  });
});
