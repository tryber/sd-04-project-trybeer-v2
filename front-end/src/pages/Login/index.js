import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormErrorMessage,
  Image,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';
import logo from '../../assets/img/logo.png';

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
    <Box bgColor="basegreen" pt="50px" height="full">
      <Alert isOpen={ isOpen } onClose={ onClose } message={ error } />
      <Image src={ logo } htmlHeight="260px" htmlWidth="210px" alt="Segun Adebayo" mx="auto" />
      <form style={ { margin: '0 auto', maxWidth: '300px' } } onSubmit={ formik.handleSubmit }>
        <Stack spacing="25px" mt="20px">
          <FormControl
            id="loginEmail"
            isInvalid={ formik.errors.loginEmail && formik.touched.loginEmail }
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="white" />
              </InputLeftElement>
              <Input
                data-testid="email-input"
                name="loginEmail"
                onBlur={ formik.handleBlur }
                onChange={ formik.handleChange }
                placeholder="meuemail@email.com"
                type="email"
                value={ formik.values.loginEmail }
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
        <Stack spacing="24px" mt="30px">
          <Button
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
