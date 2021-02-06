import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { userUpdate } from '../../../api';
import Alert from '../../../components/Alert';

const ProfileClient = ({ userId, userName, userEmail }) => {
  const [hasChanged, setHasChanged] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const statusCode = 200;

  return (
    <>
      <Alert isOpen={ isOpen } onClose={ onClose } message={ alertMsg } />
      <h1 data-testid="top-title">Meu perfil</h1>
      <Formik
        enableReinitialize
        initialValues={ {
          profileName: userName,
          profileEmail: userEmail,
        } }
        onSubmit={ async (values) => {
          const result = await userUpdate(userId, values.profileName);
          if (result.status !== statusCode) {
            setAlertMsg(result.data.message);
            setIsOpen(true);
            return null;
          }
          localStorage.user = result.data;
          setAlertMsg('Atualização concluída com sucesso');
          setIsOpen(true);
          return null;
        } }
      >
        {({
          isSubmitting, handleSubmit, handleChange, handleBlur, values,
        }) => (
          <form onSubmit={ handleSubmit }>
            <FormLabel htmlFor="profileName">Nome</FormLabel>
            <Input
              type="text"
              onChange={ (e) => { handleChange(e); setHasChanged(false); } }
              onBlur={ handleBlur }
              value={ values.profileName }
              data-testid="profile-name-input"
              name="profileName"
            />
            <FormLabel htmlFor="profileEmail">E-mail</FormLabel>
            <Input
              type="text"
              value={ values.profileEmail }
              data-testid="profile-email-input"
              name="profileEmail"
              readOnly
            />
            <Button type="submit" data-testid="profile-save-btn" disabled={ hasChanged || isSubmitting }>Salvar</Button>
          </form>
        )}
      </Formik>
    </>
  );
};
export default ProfileClient;

ProfileClient.propTypes = {
  userId: PropTypes.number,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
};

ProfileClient.defaultProps = {
  userId: 1,
  userName: '',
  userEmail: '',
};
