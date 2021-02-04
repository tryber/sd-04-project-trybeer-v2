const userController = require('../controllers/userController');

const req = {
  userName: 'Rubinho Barrichelloooo',
  email: 'costaleo12222@gmail.com',
  password: '123456',
};

const reqFail = {
  userName: 'Rubi',
  email: 'costaleo1',
  password: '123456',
};

describe('Sua aplicação deve ter o endpoint POST `/register`', () => {
  const mockResponse = () => {
    const res = {
      send: jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const res = mockResponse();

  it('Será validado que é possível cadastrar um usuário com sucesso', async () => {
    req.body = req;
    await userController.registerUser(req, res);
  });

  it('Será validado nao é possível cadastrar um usuário com dados invalidos', async () => {
    req.body = {};
    await userController.registerUser(req, res);
  });

  it('Será testado se é o update será feito corretamente', async () => {
    req.body = req;
    await userController.updateUser(req, res);
  });

  it('será testado se pode pegar todos os pedidos', async () => {
    req.body = req;
    await userController.getUserOrders(req, res);
  });

  if (
    ('será testado se o status é atualizado',
    async () => {
      req.body = req;
      await userController.updateStatus(req, res);
    })
  );
});
