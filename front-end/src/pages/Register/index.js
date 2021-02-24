import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, StarIcon } from '@chakra-ui/icons';
import jwtDecode from 'jwt-decode';
import { useFormik } from 'formik';
import { postRegister } from '../../api';
import validationSchema from './validateRegister';
import { Alert, Button, Input } from '../../components';

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
    <Box bgColor="basegreen" pt="50px" height="full">
      <Alert isOpen={ isOpen } onClose={ onClose } message={ error } />
      <Center>
        <Heading size="xl">Cadastro</Heading>
      </Center>
      <form style={ { margin: '0 auto', maxWidth: '300px' } } onSubmit={ formik.handleSubmit }>
        <Stack spacing="25px" mt="45px">
          <FormControl
            id="signName"
            isInvalid={ formik.errors.signName && formik.touched.signName }
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <StarIcon color="white" />
              </InputLeftElement>
              <Input
                data-testid="signup-name"
                name="signName"
                onBlur={ formik.handleBlur }
                onChange={ formik.handleChange }
                placeholder="meunome"
                type="text"
                value={ formik.values.signName }
              />
              <FormErrorMessage>{ formik.errors.signName }</FormErrorMessage>
            </InputGroup>
          </FormControl>
          <FormControl
            id="signEmail"
            isInvalid={
            formik.errors.signEmail && formik.touched.signEmail
          }
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="white" />
              </InputLeftElement>
              <Input
                data-testid="signup-email"
                name="signEmail"
                onBlur={ formik.handleBlur }
                onChange={ formik.handleChange }
                placeholder="meuemail"
                type="email"
                value={ formik.values.signEmail }
              />
              <FormErrorMessage>{ formik.errors.signEmail }</FormErrorMessage>
            </InputGroup>
          </FormControl>
          <FormControl
            id="signPassword"
            isInvalid={
            formik.errors.signPassword && formik.touched.signPassword
          }
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="white" />
              </InputLeftElement>
              <Input
                data-testid="signup-password"
                name="signPassword"
                onBlur={ formik.handleBlur }
                onChange={ formik.handleChange }
                placeholder="minhasenha"
                type="password"
                value={ formik.values.signPassword }
              />
              <FormErrorMessage>{ formik.errors.signPassword }</FormErrorMessage>
            </InputGroup>
          </FormControl>
        </Stack>
        <Stack spacing="25px" mt="70px">
          <FormControl>
            <Checkbox
              defaultIsChecked
              name="signRole"
              data-testid="signup-seller"
              id="signRole"
              color="white"
              onChange={ formik.handleChange }
            >
              Quero Vender
            </Checkbox>
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
        </Stack>
      </form>
    </Box>
  );
}

export default Register;
