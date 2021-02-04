const userController = require('../controllers/userController');

const req = {
  userName: 'Rubinho Barrichelloooo',
  email: 'costaleo12222@gmail.com',
  password: '123456',
};

req.body = req;
describe('Sua aplicação deve ter o endpoint POST `/register`', () => {
  afterEach(() => {
    req.body = {};
    req.body = req;
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

  it('Será validado que é possível cadastrar um usuário com sucesso', async () => {
    await userController.registerUser(req, res);
  });

  it('Será testado se é o update será feito corretamente', async () => {
    const { body: _, ...withoutBody } = req.body;
    req.body = withoutBody;
    await userController.updateUser(req, res);
  });

  it('Será testado se é o update nao será feito corretamente', async () => {
    await userController.updateUser({}, res);
  });

  it('Será validado nao é possível cadastrar um usuário com dados invalidos', async () => {
    await userController.registerUser({}, res);
  });

  it('será testado se pode pegar todos os pedidos', async () => {
    await userController.getUserOrders(req, res);
  });

  // it('será testado se o status é atualizado', async () => {
  //     req.body = req;
  //     await userController.updateStatus(req, res);
  //   }
  // );
});
