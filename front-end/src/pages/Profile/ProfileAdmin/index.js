import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import MenuAdmin from '../../../components/MenuAdmin';

const ProfileAdmin = ({ userName, userEmail }) => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
  }, [history]);

  return (
    <>
      <MenuAdmin />
      <h1 data-testid="top-title">Meu perfil</h1>
      <p data-testid="profile-name">
        Nome:
        {' '}
        {userName}
      </p>
      <p data-testid="profile-email">
        Email:
        {' '}
        {userEmail}
      </p>
    </>);
};

export default ProfileAdmin;

ProfileAdmin.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
};

ProfileAdmin.defaultProps = {
  userName: '',
  userEmail: '',
};
