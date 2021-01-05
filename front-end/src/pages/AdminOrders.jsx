import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import MenuAdmin from '../components/MenuAdmin';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const DOIS = 2;

  const getOrders = () => {
    axios
      .get('http://localhost:3001/sales')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => { throw new Error(error.message); });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return setRedirectToLogin(true);
    }

    return getOrders();
  }, []);

  return (
    <div>
      <MenuAdmin title="Meus Pedidos" />
      <h1>Pedidos</h1>
      {redirectToLogin && <Redirect to="/login" />}
      {orders
      && orders.map((order, index) => (
        <div key={ order.id }>
          <Link to={ `/admin/orders/${order.id}` }>
            <p
              data-testid={ `${index}-order-number` }
            >
              { `Pedido ${order.id}` }
            </p>
            <p
              data-testid={ `${index}-order-address` }
            >
              { `${order.deliveryAddress}, ${order.deliveryNumber}` }
            </p>
            <p data-testid={ `${index}-order-total-value` }>
              { `R$ ${Number(order.totalPrice).toFixed(DOIS).replace('.', ',')}` }
            </p>
            <p data-testid={ `${index}-order-status` }>{order.status}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default connect(null, null)(AdminOrders);
