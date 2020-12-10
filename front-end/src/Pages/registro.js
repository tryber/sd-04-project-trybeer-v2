import React, { useState, useRef } from 'react';
import {
  Field, Label, Input, Button, Notification,
} from 'rbx';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from 'react-router';
import api from '../services/userApi';

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();
  const bool = true;

  const simpleValidator = useRef(new SimpleReactValidator());
  const { errorName, errorEmail, errorPassword } = simpleValidator.current.fields;

  // https://stackoverflow.com/questions/56356900/way-to-determine-checkbox-checked-in-react-usestate
  const handleChecked = () => {
    setChecked(!checked);
    setRole('administrator');
  };

  const registraUsuario = (e) => {
    e.preventDefault();
    api
      .register(name, email, password, role)
      .then(() => {
        if (role === 'administrator') {
          history.push('/admin/orders');
        } else {
          history.push('/products');
        }
      })
      .catch(() => {
        setMessage('E-mail already in database.');
      });
  };

  return (
    <div className="registro-content">
      <h2 className="lr-title">Registro</h2>
      {message ? (
        <Notification color="danger" size="small">
          {message}
        </Notification>
      ) : (
        ''
      )}
      <form className="form-content" onSubmit={ registraUsuario }>
        <Field>
          <Label>Nome</Label>
          <Input
            data-testid="signup-name"
            type="text"
            placeholder="Digite seu nome"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            onBlur={ simpleValidator.current.showMessageFor('errorName') }
          />
          {simpleValidator.current.message('errorName', name, 'required|min:11|alpha_space')}
        </Field>
        <Field>
          <Label>Email</Label>
          <Input
            data-testid="signup-email"
            type="text"
            placeholder="Digite seu email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            onBlur={ simpleValidator.current.showMessageFor('errorEmail') }
          />
          {simpleValidator.current.message('errorEmail', email, 'required|email')}
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            data-testid="signup-password"
            type="password"
            placeholder="Digite a senha"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            onBlur={ simpleValidator.current.showMessageFor('errorPassword') }
          />
          {simpleValidator.current.message('errorPassword', password, 'required|min:5')}
        </Field>
        <Field>
          <Label>
            <input
              data-testid="signup-seller"
              type="checkbox"
              value={ checked }
              checked={ checked }
              onClick={ handleChecked }
            />
            Quero Vender
          </Label>
        </Field>
        {errorName && errorEmail && errorPassword ? (
          <Button data-testid="signup-btn" color="success">
            Cadastrar
          </Button>
        ) : (
          <Button data-testid="signup-btn" color="success" disabled={ bool }>
            Cadastrar
          </Button>
        )}
      </form>
    </div>
  );
};

export default Registro;
