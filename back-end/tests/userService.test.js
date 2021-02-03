const userServoce = require("../services/userService");

const req = {
  userName: "Rubinho Barrichello",
	email: "rangel12sddssds3@gmail.com",
	password: "123456"
};

describe('Sua aplicação deve ter o endpoint POST `/register`', () => {
  it('Será testado se o usuario já existe', async() => {
    const user = await userServoce.createUser(req);
    
    expect(user).toBe({ message: 'E-mail already in database.' })
  });

  it('Será testado se o login e executado corretamente', async() => {
    await userServoce.login(req);
  })

});