import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Menu from '../components/Menu';

const OrderDetails = () => {
  const OITO = 8;
  const ZERO = 0;
  const CINCO = 5;
  const DOIS = 2;

  const [orderDetails, setOrderDetails] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      setRedirectToLogin(true);
    }

    axios
      .get('http://localhost:3001/order-details', {
        params: { saleId: window.location.pathname.slice(OITO) },
      })
      .then((res) => {
        setOrderDetails(res.data);
      });
  }, []);

  return (
    <div>
      <Menu title="Detalhes de Pedido" />
      {redirectToLogin && <Redirect to="/login" />}
      {orderDetails.length && (
        <div>
          <p data-testid="order-number">{`Pedido ${orderDetails[0].saleID}`}</p>
          <p data-testid="order-date">
            {new Date(orderDetails[0].saleDate)
              .toLocaleDateString('pt-BR', { timeZone: 'UTC' })
              .slice(ZERO, CINCO)}
          </p>
          <p data-testid="order-total-value">
            {`Total: R$ ${orderDetails[0].totalPrice
              .toFixed(DOIS)
              .replace('.', ',')}`}
          </p>
        </div>
      )}
      {orderDetails && (
        <ol>
          {orderDetails.map((order, index) => (
            <li key={ order.productName }>
              <p data-testid={ `${index}-product-name` }>{ order.productName }</p>
              <p data-testid={ `${index}-product-qtd` }>
                {order.productQuantity}
              </p>
              <p data-testid={ `${index}-product-total-value` }>
                { `R$ ${(order.productPrice * order.productQuantity)
                  .toFixed(DOIS)
                  .replace('.', ',')}` }
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default connect(null, null)(OrderDetails);
