import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import MenuAdmin from '../components/MenuAdmin';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return setRedirectToLogin(true);
    }

    axios
      .get('http://localhost:3001/sales')
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <MenuAdmin title="Meus Pedidos" />
      <h1>Pedidos</h1>
      {redirectToLogin && <Redirect to="/login" />}
      {orders &&
        orders.map((order, index) => (
          <div key={order.id}>
            <Link to={`/admin/orders/${order.id}`}>
              <p
                data-testid={`${index}-order-number`}
              >{`Pedido ${order.id}`}</p>

              <p
                data-testid={`${index}-order-address`}
              >{`${order.address}, ${order.number}`}</p>

              <p data-testid={`${index}-order-total-value`}>
                {`R$ ${order.price.toFixed(2).replace('.', ',')}`}
              </p>
              <p data-testid={`${index}-order-status`}>{order.status}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default connect(null, null)(AdminOrders);
