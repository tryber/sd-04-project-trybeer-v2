const frisby = require('frisby');

const url = 'http://localhost:3001';

const userController = require("../controllers/userController");

const req = {
  user: {
    id: 1,
  },
  body: {
    total: {
      email: 'tryber@trybe.com.br',
      total: 15.0,
      address: 'Vila da Folha',
      number: 15,
      date: '2020-11-20T20:48:32.649Z',
      status: 'Pendente',
      products: [
        {
          productId: 8,
          quantity: 5,
        },
        {
          productId: 4,
          quantity: 5,
        },
      ],
    },
  },
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

  it('Será validado que é possível fazer login com sucesso', async () => {
    const res = mockResponse();
    console.log(res);
    await frisby.post(`${url}/login`,
        {
          email: 'zebirita@gmail.com',
          password: '12345678',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.token).not.toBeNull();
      });
    
    await userController.loginUser(req, res);
  });

  it('Será validado que não é possível fazer login sem o campo `email`', async () => {
    await frisby
      .post(`${url}/login`,
        {
          password: '12345678',
        })
      .expect('status', 500)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('WHERE parameter \"email\" has invalid \"undefined\" value');
      });
  });

  it('Será validado que não é possível fazer login sem o campo `password`', async () => {
    await frisby
      .post(`${url}/login`,
        {
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
    await frisby.post(`${url}/login`, {
      email: 'teste',
      password: '12345678'
    })
    .expect('status', 500)
    .then(({ body }) => {
      const { email } = body;

      const result = JSON.parse(body);
      expect(result.message).toBe(`Cannot read property 'password' of null`);
    })
  })
});
