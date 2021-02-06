import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import { useFormik } from 'formik';
import { postRegister } from '../../api';
import validationSchema from './validateRegister';
import Alert from '../../components/Alert';

function Register() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const onClose = () => setIsOpen(false);
  const statusCode = 201;

  const formik = useFormik({
    initialValues: {
      signName: '',
      signEmail: '',
      signPassword: '',
      signRole: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      const {
        signName, signEmail, signPassword, signRole,
      } = values;
      const signUp = await postRegister(signName, signEmail, signPassword, signRole);

      if (signUp.status !== statusCode) {
        setError(signUp.data.message);
        setIsOpen(true);
        formik.resetForm();
        return null;
      }
      if (!localStorage.user) localStorage.user = JSON.stringify(signUp.data);
      const redirect = jwtDecode(signUp.data).role === 'client' ? '/products' : '/admin/orders';
      return history.push(redirect);
    },
  });

  return (
    <div>
      <Alert isOpen={ isOpen } onClose={ onClose } message={ error } />
      <form onSubmit={ formik.handleSubmit }>
        <FormControl
          id="signName"
          isInvalid={ formik.errors.signName && formik.touched.signName }
        >
          <FormLabel htmlFor="signName">Nome</FormLabel>
          <Input
            type="text"
            name="signName"
            data-testid="signup-name"
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            value={ formik.values.signName }
          />
          <FormErrorMessage>{ formik.errors.signName }</FormErrorMessage>
        </FormControl>
        <FormControl
          id="signEmail"
          isInvalid={
            formik.errors.signEmail && formik.touched.signEmail
          }
        >
          <FormLabel htmlFor="signEmail">Email</FormLabel>
          <Input
            type="email"
            name="signEmail"
            data-testid="signup-email"
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            value={ formik.values.signEmail }
          />
          <FormErrorMessage>{ formik.errors.signEmail }</FormErrorMessage>
        </FormControl>
        <FormControl
          id="signPassword"
          isInvalid={
            formik.errors.signPassword && formik.touched.signPassword
          }
        >
          <FormLabel htmlFor="signPassword">Password</FormLabel>
          <Input
            type="password"
            name="signPassword"
            data-testid="signup-password"
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            value={ formik.values.signPassword }
          />
          <FormErrorMessage>{ formik.errors.signPassword }</FormErrorMessage>
        </FormControl>
        <FormControl>
          <label htmlFor="signRole">
            <input
              type="checkbox"
              name="signRole"
              data-testid="signup-seller"
              id="signRole"
              onChange={ formik.handleChange }
            />
            Quero Vender
          </label>
        </FormControl>

        <Button
          variantColor="green"
          type="submit"
          id="signup-btn"
          data-testid="signup-btn"
          disabled={
            formik.isSubmitting
            || formik.errors.signName
            || formik.errors.signEmail
            || formik.errors.signPassword
          }
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}

export default Register;
