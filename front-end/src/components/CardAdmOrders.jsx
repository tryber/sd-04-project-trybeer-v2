import React from 'react';
import { useHistory } from 'react-router-dom';
import './CardAdmOrders.css';

const changeUrl = (history, url) => history.push(`/admin/orders/${url}`);

const AdmOrders = ({
  order, address, number, price, status,
}) => {
  const history = useHistory();
  const valueToFixed = 2;
  const correctPrice = price
    .toFixed(valueToFixed)
    .toLocaleString()
    .replace('.', ',');
  const correctOrder = order - 1;
  const url = order.toLocaleString();

  return (
    <button type="button" className="card-button" onClick={ () => changeUrl(history, url) }>
      <div className="order-container">
        <h3 data-testid={ `${correctOrder}-order-number` }>
          { `Pedido ${order}` }
        </h3>
        <p data-testid={ `${correctOrder}-order-address` }>{`${address} ${number}`}</p>
      </div>
      <div className="price-container">
        <h4 className="price-text" data-testid={ `${correctOrder}-order-total-value` }>
          { `R$ ${correctPrice}` }
        </h4>
        <h5 className="status-text" data-testid={ `${correctOrder}-order-status` }>
          {status}
        </h5>
      </div>
    </button>
  );
};

export default AdmOrders;
