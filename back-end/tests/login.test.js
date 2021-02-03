const frisby = require('frisby');
// const shell = require('shelljs');
const { login } = require('../controllers/login');
// const { createToken } = require('../middlewares/createJWT');

const url = 'http://localhost:3001';

const req = {
  email: 'zebirita@gmail.com',
  password: '12345678',
};

req.body = req;

describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  const mockResponse = () => {
    const res = {
      send: jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  // beforeEach(async () => {
  //   shell.exec('npx sequelize-cli db:drop');
  //   shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
  //   shell.exec('npx sequelize-cli db:seed:all $');
  // });

    it('Será validado que é possível fazer login com sucesso', async () => {
      const res = mockResponse();
      // await createToken(req);
      await login(req, res);
      await frisby.post(`${url}/login`)
        .expect('status', 200)
        .then((response) => {
          console.log('response', response.body);
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.token).not.toBeNull();
        });
    });

    it('Será validado que não é possível fazer login sem o campo `email`', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: '',
            password: '12345678',
          })
        .expect('status', 401)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('É necessário usuário e senha para fazer login');
        });
    });

    it('Será validado que não é possível fazer login sem o campo `password`', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'lewishamilton@gmail.com',
          })
        .expect('status', 401)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('É necessário usuário e senha para fazer login');
        });
    });

    it('Seria validado que o email possui o formato correto', async () => {
      await frisby.post(`${url}/login`, {
        email: 'teste',
        password: '12345678',
      })
        .expect('status', 401)
        .then(({ body }) => {
          // const { email } = body;

          const result = JSON.parse(body);
          expect(result.message).toBe('Usuário não existe ou senha inválida');
        });
    });

    it('Será validado que não é possível fazer login com o campo `email` em branco', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: '',
            password: '123456',
          })
        .expect('status', 401)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('É necessário usuário e senha para fazer login');
        });
    });

    it('Será validado que não é possível fazer login com o campo `password` em branco', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'lewishamilton@gmail.com',
            password: '',
          })
        .expect('status', 401)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('É necessário usuário e senha para fazer login');
        });
    });

    it('Será validado que não é possível fazer login com um usuário que não existe', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'senna@gmail.com',
            password: '123456',
          })
        .expect('status', 401)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('Usuário não existe ou senha inválida');
        });
    });
  });
});
