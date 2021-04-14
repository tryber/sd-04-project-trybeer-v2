const userService = require('../../services/userService');

describe('User Services', () => {
  test('teste do User Register', async () => {
    const { name, email, password, role } = {
      name: 'Victor Lustosa',
      email: 'victor@gmail.com',
      password: '12345678',
      role: 'client',
    };
    const user = {
      name: 'Victor Lustosa',
      email: 'victor@gmail.com',
      password: '12345678',
      role: 'client',
    };
    await userService.userDelete(email);
    const response = await userService.userRegister(
      name,
      email,
      password,
      role,
    );
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('userData');
    expect(response.userData.dataValues).toMatchObject(user);
  });

  test('teste do userUpdate', async () => {
    const { name, email } = {
      name: 'Victor Lustosas',
      email: 'victor@gmail.com',
    };
    const message = {
      message: 'Atualização concluída com sucesso',
    };
    const response = await userService.userUpdate(name, email);
    expect(response).toHaveProperty('message');
    expect(response).toMatchObject(message);
  });
});
