import React from 'react';
import { useSelector } from 'react-redux';

/** Components */
import Header from '../../components/Header';

function AdminProfile() {
  const { name, email } = useSelector((state) => state.userReducer.user);

  return (
    <div>
      <Header />
      <div>
        Nome:
        <span data-testid="profile-name">
          {name}
        </span>
      </div>
      <div>
        Email:
        <span data-testid="profile-email">
          {email}
        </span>
      </div>
    </div>
  );
}

export default AdminProfile;
