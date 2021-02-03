const frisby = require('frisby');
const { nominalTypeHack } = require('prop-types');
const shell = require('shelljs');

const url = 'http://localhost:3001';

const userServoce = require("../services/userService");

const req = {
  userName: "Rubinho Barrichello",
	email: "costaleo122@gmail.com",
	password: "123456"
};

describe('Sua aplicação deve ter o endpoint POST `/register`', () => {
  it('Será testado se é o update será feito corretamente', async() => {
    await userServoce.createUser(req);
  });

  it('Será testado se o login e executado corretamente', async() => {
    await userServoce.login(req);
  })

});