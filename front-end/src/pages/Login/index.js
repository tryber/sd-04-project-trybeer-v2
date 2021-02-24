import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormErrorMessage,
  InputLeftElement,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';

import { userLogin } from '../../api';
import validationSchema from './validateLogin';
import { Alert, Button, Input } from '../../components';

const Login = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const onClose = () => setIsOpen(false);
  const statusCode = 200;

  const formik = useFormik({
    initialValues: {
      loginEmail: '',
      loginPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await userLogin(values.loginEmail, values.loginPassword);
      if (result.status !== statusCode) {
        setError(result.data.message);
        setIsOpen(true);
        formik.resetForm();
        return null;
      }

      if (!localStorage.user) localStorage.user = result.data;
      const redirect = jwtDecode(result.data).dataValues.role === 'client' ? '/products' : '/admin/orders';
      return history.push(redirect);
    },
  });

  return (
    <Box bgColor="basegreen" py="50px" minHeight="100%">
      <Alert isOpen={ isOpen } onClose={ onClose } message={ error } />
      <form style={ { margin: '0 30px' } } onSubmit={ formik.handleSubmit }>
        <Stack spacing="40px">
          <FormControl
            id="loginEmail"
            isInvalid={ formik.errors.loginEmail && formik.touched.loginEmail }
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="white" />
              </InputLeftElement>
              <Input
                type="email"
                name="loginEmail"
                data-testid="email-input"
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                value={ formik.values.loginEmail }
                placeholder="meuemail@email.com"
              />
              <FormErrorMessage>{formik.errors.loginEmail}</FormErrorMessage>
            </InputGroup>
          </FormControl>
          <FormControl
            id="loginPassword"
            isInvalid={
            formik.errors.loginPassword && formik.touched.loginPassword
          }
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="white" />
              </InputLeftElement>
              <Input
                type="password"
                name="loginPassword"
                data-testid="password-input"
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                value={ formik.values.loginPassword }
                placeholder="minhasenha"
              />
              <FormErrorMessage>{formik.errors.loginPassword}</FormErrorMessage>
            </InputGroup>
          </FormControl>
        </Stack>
        <Stack spacing="24px" mt="50px">
          <Button
            variant="solid"
            type="submit"
            data-testid="signin-btn"
            disabled={
            formik.errors.loginPassword
            || formik.errors.loginEmail
            || formik.isSubmitting
          }
          >
            ENTRAR
          </Button>
          <Button
            variant="solid"
            type="submit"
            data-testid="no-account-btn"
            disabled={ formik.isSubmitting }
            onClick={ () => {
              history.push('/register');
            } }
          >
            Ainda não tenho conta
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
