import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitForDomChange } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

test('Verifica se os elementos estão escritos na tela', () => {
  const { getByText } = renderWithRouter(<Login />);
  const Title = getByText('Login Page');
  const Email = getByText('Email');
  const password = getByText('Password');
  const ENTRAR = getByText('ENTRAR');
  const noCount = getByText('Ainda não tenho conta');

  expect(ENTRAR).toBeInTheDocument();
  expect(Title).toBeInTheDocument();
  expect(Email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(noCount).toBeInTheDocument();
});

test('altera o valor dos campos e testa o valor guardado', () => {
  const { getByTestId } = renderWithRouter(<Login />);
  const inputEmail = getByTestId('email-input');
  expect(inputEmail).toHaveValue('');
  fireEvent.change(inputEmail, { target: { value: 'zebirita@gmail.com' } });
  expect(inputEmail).toHaveValue('zebirita@gmail.com');

  const inputPassword = getByTestId('password-input');
  expect(inputPassword).toHaveValue('');
  fireEvent.change(inputPassword, { target: { value: '12345678' } });
  expect(inputPassword).toHaveValue('12345678');
});

test('verifica se usuario é redirecionado para pagina de produtos', async () => {
  const { history } = renderWithRouter(<Login />);

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const button = screen.getByRole('button', { name: /ENTRAR/i });

  userEvent.type(emailInput, 'zebirita@gmail.com');
  userEvent.type(passwordInput, '12345678');

  expect(emailInput).toHaveValue('zebirita@gmail.com');
  expect(passwordInput).toHaveValue('12345678');

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  expect(button).toBeEnabled();

  fireEvent.submit(button, {
    target: {
      email: { value: emailValue },
      password: { value: passwordValue },
    },
  });

  await waitForDomChange();

  expect(history.location.pathname).toBe('/products');
});

test('verifica se é possivel ir a pagina de registro', () => {
  const { history } = renderWithRouter(<Login />);

  userEvent.click(
    screen.getByRole('button', { name: /Ainda não tenho conta/i })
  );

  expect(history.location.pathname).toBe('/register');
});
