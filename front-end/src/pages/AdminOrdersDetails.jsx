import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import MenuAdmin from '../components/MenuAdmin';

const AdminOrdersDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/order-details', {
        params: { saleId: window.location.pathname.slice(14) },
      })
      .then((res) => {
        setOrderStatus(res.data[0].status);
        setOrderDetails(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateOrderStatus = () => {
    axios
      .put('http://localhost:3001/sales', {
        saleId: window.location.pathname.slice(14),
        status: 'Entregue',
      })
      .then((_res) => {
        setOrderStatus('Entregue');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <MenuAdmin title="Detalhes do Pedido" />
      {orderDetails.length && (
        <div>
          <p data-testid="order-number">{`Pedido ${orderDetails[0].saleID}`}</p>
          <p data-testid="order-status">{orderStatus}</p>
          <p data-testid="order-total-value">{`Total: R$ ${orderDetails[0].totalPrice
            .toFixed(2)
            .replace('.', ',')}`}</p>
        </div>
      )}
      {orderDetails && (
        <ol>
          {orderDetails.map((order, index) => (
            <li key={order.productName}>
              <p data-testid={`${index}-product-name`}>{order.productName}</p>
              <p data-testid={`${index}-product-qtd`}>
                {order.productQuantity}
              </p>
              <p data-testid={`${index}-order-unit-price`}>
                {`(R$ ${order.productPrice.toFixed(2).replace('.', ',')})`}
              </p>
              <p data-testid={`${index}-product-total-value`}>
                {`R$ ${(order.productPrice * order.productQuantity)
                  .toFixed(2)
                  .replace('.', ',')}`}
              </p>
            </li>
          ))}
        </ol>
      )}
      {orderStatus === 'Pendente' && (
        <button
          type="button"
          data-testid="mark-as-delivered-btn"
          onClick={() => updateOrderStatus()}
        >
          Marcar como entregue
        </button>
      )}
    </div>
  );
};

export default connect(null, null)(AdminOrdersDetails);
