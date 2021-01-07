const loginService = require('../../services/loginService');
/// esse teste faz o service nao o controller

describe('Login user', () => {
  const user = {
    id: 2,
    name: 'Cliente Zé Birita',
    email: 'zebirita@gmail.com',
    role: 'client',
  };
  const { email, password } = {
    email: 'zebirita@gmail.com',
    password: '12345678',
  };
  /*Teste para login que existe*/
  test('when the user exist', async () => {
    const response = await loginService.userLogin(email, password);
    // expect(response.status).toEqual(200);
    expect(response.userData).toEqual(user);
    // expect(response.body.message).to.equal('Something went wrong');
  });
});
