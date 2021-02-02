import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

test('Verifica se os elementos estão escritos na tela', () => {
  const { getByText } = renderWithRouter(<Login />);
  const Email = getByText('Email');
  expect(Email).toBeInTheDocument();
  const password = getByText('Password');
  expect(password).toBeInTheDocument();
  const ENTRAR = getByText('ENTRAR');
  expect(ENTRAR).toBeInTheDocument();
  const noCount = getByText('Ainda não tenho conta');
  expect(noCount).toBeInTheDocument();
});
