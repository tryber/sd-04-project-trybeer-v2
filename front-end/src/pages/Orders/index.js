import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import OrdersClient from './OrdersClient';
import OrdersAdmin from './OrdersAdmin';

const Orders = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
  }, [history]);
  if (localStorage.user) {
    if (location.pathname === '/orders') {
      return (
        <OrdersClient />
      );
    }
    return (
      <OrdersAdmin />
    );
  }
  return <p> Loading...</p>;
};
export default Orders;
