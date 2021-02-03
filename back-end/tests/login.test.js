const frisby = require('frisby');
// const request = require('supertest');
// const express = require('express');

const url = 'http://localhost:3001';

const userController = require("../controllers/userController");

const req = {
  email: 'zebirita@gmail.com',
  password: '12345678',
}


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
    const user = await userController.loginUser(req, res);
    console.log(user.status);
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
}
);
