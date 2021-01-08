const loginService = require('../../services/loginService');
/// esse teste faz o service nao o controller

describe('Login user', () => {
  /*Teste para login que existe*/
  test('when the user exist', async () => {
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
    const response = await loginService.userLogin(email, password);
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('userData');
    expect(response.userData).toEqual(user);
  });
  test('when the user not exist', async () => {
    const { email, password } = {
      email: 'humberto@gmail.com',
      password: '12345678',
    };
    await expect(() => loginService.userLogin(email, password)).rejects.toThrow(new Error('User not found'));
  });
});
