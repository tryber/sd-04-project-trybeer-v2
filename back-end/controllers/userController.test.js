const userController = require('../controllers/userController');

describe('/login tests', () => {
  test("Quando alguem envia dados errados", async () => {
    const user = { email: "email@email.com", password: "123456" };

    const response = await userController.userLogin(user);

    expect(response.status).to.equal(400);
  });
  
})
