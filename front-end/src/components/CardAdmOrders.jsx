import React from 'react';
import { useHistory } from 'react-router-dom';
import './CardAdmOrders.css';

const changeUrl = (history, url) => history.push(`/admin/orders/${url}`);

const AdmOrders = ({ order, address, price, status }) => {
  const history = useHistory();
  const correctPrice = price.toFixed(2).toLocaleString().replace('.', ',');
  const correctOrder = order - 1;
  const url = order.toLocaleString();

  return (
    <button className="card-button" onClick={() => changeUrl(history, url)}>
      <div className="order-container">
        <h3 data-testid={`${correctOrder}-order-number`}>{`Pedido ${order}`}</h3>
        <p data-testid={`${correctOrder}-order-address`}>{address}</p>
      </div>
      <div className="price-container">
        <h4 className="price-text" data-testid={`${correctOrder}-order-total-value`}>
          {`R$ ${correctPrice}`}
        </h4>
        <h5 className="status-text" data-testid={`${correctOrder}-order-status`}>
          {status}
        </h5>
      </div>
    </button>
  );
};

export default AdmOrders;
