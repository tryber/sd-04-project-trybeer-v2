const frisby = require('frisby');
const { nominalTypeHack } = require('prop-types');
const shell = require('shelljs');

const url = 'http://localhost:3001';

const userController = require("../controllers/userController");

const req = {
  userName: "Rubinho Barrichello",
	email: "costaleo122@gmail.com",
	password: "123456"
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

  it('Será validado que é possível cadastrar um usuário com sucesso', async () => {
    const res = mockResponse();
    
    await frisby
      .post(`${url}/register`,
        {
          userName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '123456'
        })
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.token).not.toBeNull();
      });

      await userController.registerUser(req, res);
  });

  it('Será testado se é o update será feito corretamente', async() => {
    const res = mockResponse();

    await userController.updateUser(req, res);
  });

  it('será testado se pode pegar todos os pedidos', async() => {
    const res = mockResponse();

    await userController.getUserOrders(req, res);
  });

  if('será testado se o status é atualizado', async() => {
    const res = mockResponse();

    await userController.updateStatus(req, res);
  });

});