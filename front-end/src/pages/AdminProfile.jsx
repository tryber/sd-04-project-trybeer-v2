import React, { useState, useEffect } from 'react';

import MenuAdmin from '../components/MenuAdmin';
import { Redirect } from 'react-router-dom';

const AdminProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setUserLogged(true);
    } else {
      const { name, email } = user;
      setName(name);
      setEmail(email);
    }
  }, []);

  return (
    <div>
      {userLogged ? <Redirect to="/login" /> : null}
      <MenuAdmin />
      <h1>Login</h1>
      <h3 data-testid="profile-name">Nome: {name}</h3>
      <h3 data-testid="profile-email">Email: {email}</h3>
    </div>
  );
};

export default AdminProfile;
