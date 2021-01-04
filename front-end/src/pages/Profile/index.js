import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import ProfileClient from './ProfileClient';
import ProfileAdmin from './ProfileAdmin';

const Profile = () => {
  const history = useHistory();
  const location = useLocation();
  const [localUser, setLocalUser] = useState({});

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
    if (localStorage.user) setLocalUser(jwtDecode(localStorage.user));
  }, [history]);

  if (location.pathname === '/profile') {
    return (
      <ProfileClient
        userId={ localUser.id }
        userName={ localUser.name }
        userEmail={ localUser.email }
      />
    );
  }
  return (
    <ProfileAdmin
      userName={ localUser.name }
      userEmail={ localUser.email }
    />
  );
};
export default Profile;
