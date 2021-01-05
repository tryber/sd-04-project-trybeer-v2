import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Menu from '../components/Menu';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const ZERO = 0;
  const DOIS = 2;
  const CINCO = 5;
  const OITO = 8;

  const getOrderDetails = () => {
    axios
      .get('http://localhost:3001/order-details', {
        params: { saleId: window.location.pathname.slice(OITO) },
      })
      .then((res) => {
        setOrderDetails(res.data);
      })
      .catch((error) => { throw new Error(error.message); });
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      return setRedirectToLogin(true);
    }

    return getOrderDetails();
  }, []);

  return (
    <div>
      <Menu title="Detalhes de Pedido" />
      {redirectToLogin && <Redirect to="/login" />}
      {orderDetails.length && (
        <div>
          <p data-testid="order-number">{`Pedido ${orderDetails[0].id}`}</p>
          <p data-testid="order-date">
            {new Date(orderDetails[0].saleDate)
              .toLocaleDateString('pt-BR', { timeZone: 'UTC' })
              .slice(ZERO, CINCO)}
          </p>
          <p data-testid="order-total-value">
            {`Total: R$ ${Number(
              orderDetails[0].totalPrice,
            )
              .toFixed(DOIS)
              .replace('.', ',')}`}
          </p>
          <p>{orderDetails[0].status}</p>
        </div>
      )}
      {orderDetails.length && (
        <ol>
          {orderDetails[0].products.map((product, index) => (
            <li key={ product.name }>
              <p data-testid={ `${index}-product-name` }>{product.name}</p>
              <p data-testid={ `${index}-product-qtd` }>
                {product.salesProducts.quantity}
              </p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${(Number(product.price) * product.salesProducts.quantity)
                  .toFixed(DOIS)
                  .replace('.', ',')}`}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default connect(null, null)(OrderDetails);
