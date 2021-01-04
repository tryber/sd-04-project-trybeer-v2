import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import ClientDetails from './ClientDetails';
import AdminDetails from './AdminDetails';

const OrderDetails = () => {
  const history = useHistory();
  const clientRoute = useRouteMatch('/orders/:id');

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
  }, [history]);
  if (localStorage.user) {
    if (clientRoute) {
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
