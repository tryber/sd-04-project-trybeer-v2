import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './CardAdmOrders.css';

const changeUrl = (history, url) => history.push(`/admin/orders/${url}`);
const dois = 2;

const AdmOrders = ({
  order, address, price, status, index,
}) => {
  const history = useHistory();
  const correctPrice = price.toFixed(dois).toLocaleString().replace('.', ',');
  const correctOrder = order[0] - 1;
  const url = order.toLocaleString();

  return (
    <button type="button" className="card-button" onClick={ () => changeUrl(history, url) }>
      <div className="order-container">
        <h3 data-testid={ `${index}-order-number` }>{`Pedido ${order}`}</h3>
        <p data-testid={ `${correctOrder}-order-address` }>{address}</p>
      </div>
      <div className="price-container">
        <h4 className="price-text" data-testid={ `${order}-order-total-value` }>
          {`R$ ${correctPrice}`}
        </h4>
        <h5 className="status-text" data-testid={ `${index}-order-status` }>
          {status}
        </h5>
      </div>
    </button>
  );
};

AdmOrders.propTypes = {
  index: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  order: PropTypes.shape({
    toLocaleString: PropTypes.func,
  }).isRequired,
  price: PropTypes.shape({
    toFixed: PropTypes.func,
  }).isRequired,
  status: PropTypes.string.isRequired,
};

export default AdmOrders;
