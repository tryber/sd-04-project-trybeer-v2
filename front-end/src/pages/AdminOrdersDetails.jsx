import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import MenuAdmin from '../components/MenuAdmin';

const AdminOrdersDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  const DOIS = 2;
  const QUATORZE = 14;

  useEffect(() => {
    axios
      .get('http://localhost:3001/order-details', {
        params: { saleId: window.location.pathname.slice(QUATORZE) },
      })
      .then((res) => {
        setOrderStatus(res.data[0].status);
        setOrderDetails(res.data);
      })
      .catch((error) => { throw new Error(error.message); });
  }, []);

  const updateOrderStatus = (status) => {
    axios
      .put('http://localhost:3001/sales', {
        saleId: window.location.pathname.slice(QUATORZE),
        status,
      })
      .then(() => {
        setOrderStatus(status);
      })
      .catch((error) => { throw new Error(error.message); });
  };

  return (
    <div>
      <MenuAdmin title="Detalhes do Pedido" />
      {orderDetails.length && (
        <div>
          <p data-testid="order-number">{ `Pedido ${orderDetails[0].id}` }</p>
          <p data-testid="order-status">{orderStatus}</p>
          <p data-testid="order-total-value">
            { `Total: R$ ${Number(orderDetails[0].totalPrice).toFixed(DOIS).replace('.', ',')}` }
          </p>
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
              <p data-testid={ `${index}-order-unit-price` }>
                {`(R$ ${Number(product.price).toFixed(DOIS).replace('.', ',')})`}
              </p>
              <p data-testid={ `${index}-product-total-value` }>
                { `R$ ${(Number(product.price) * product.salesProducts.quantity)
                  .toFixed(DOIS)
                  .replace('.', ',')}` }
              </p>
            </li>
          ))}
        </ol>
      )}
      {orderStatus !== 'Entregue' && (
        <div>
          <button
            type="button"
            data-testid="mark-as-prepared-btn"
            onClick={ () => updateOrderStatus('Preparando') }
          >
            Preparar pedido
          </button>
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            onClick={ () => updateOrderStatus('Entregue') }
          >
            Marcar como entregue
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(null, null)(AdminOrdersDetails);
