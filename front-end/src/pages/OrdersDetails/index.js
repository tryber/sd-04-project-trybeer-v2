import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import ClientDetails from './ClientDetails';
import AdminDetails from './AdminDetails';

const OrderDetails = () => {
  const history = useHistory();
  // const clientRoute = useRouteMatch('/orders/:id');

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
  }, [history]);
  const user = jwtDecode(localStorage.user);
  if (localStorage.user) {
    if (user.dataValues.role === 'client') {
      return (
        <ClientDetails />
      );
    }
    return (
      <AdminDetails />
    );
  }
  return <p> Loading...</p>;
};
export default OrderDetails;
