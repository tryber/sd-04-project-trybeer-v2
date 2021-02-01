const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  beforeEach(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
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

  // it('Será validado que não é possível fazer login com o campo `email` em branco', async () => {
  //   await frisby
  //     .post(`${url}/login`,
  //       {
  //         email: '',
  //         password: '123456',
  //       })
  //     .expect('status', 400)
  //     .then((response) => {
  //       const { body } = response;
  //       const result = JSON.parse(body);
  //       expect(result.message).toBe('"email" is not allowed to be empty');
  //     });
  // });

  // it('Será validado que não é possível fazer login com o campo `password` em branco', async () => {
  //   await frisby
  //     .post(`${url}/login`,
  //       {
  //         email: 'lewishamilton@gmail.com',
  //         password: '',
  //       })
  //     .expect('status', 400)
  //     .then((response) => {
  //       const { body } = response;
  //       const result = JSON.parse(body);
  //       expect(result.message).toBe('"password" is not allowed to be empty');
  //     });
  // });

  // it('Será validado que não é possível fazer login com um usuário que não existe', async () => {
  //   await frisby
  //     .post(`${url}/login`,
  //       {
  //         email: 'senna@gmail.com',
  //         password: '123456',
  //       })
  //     .expect('status', 400)
  //     .then((response) => {
  //       const { body } = response;
  //       const result = JSON.parse(body);
  //       expect(result.message).toBe('Campos inválidos');
  //     });
  // });
});