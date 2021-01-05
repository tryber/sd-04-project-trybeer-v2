import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ADMOrdersCards = ({ orders, testid }) => (
  <div className="orders-card-body">
    <div className="ordereds-info">
      <Link to={ `/admin/orders/${orders.id}` } data-testid={ `${testid}-order-number` }>
        { `Pedido ${orders.id}` }
      </Link>
    </div>
    <span data-testid={ `${testid}-order-address` }>
      { `${orders.deliveryAdress}, ${orders.deliveryNumber}` }
    </span>
    <br />
    <span className="bold-text" data-testid={ `${testid}-order-total-value` }>
      { orders.totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
    </span>
    <button type="button" data-testid={ `${testid}-order-status` }>{ orders.status }</button>
  </div>
);

ADMOrdersCards.propTypes = {
  testid: PropTypes.number.isRequired,
  orders: PropTypes.shape({
    id: PropTypes.number,
    deliveryAdress: PropTypes.string,
    deliveryNumber: PropTypes.number,
    status: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default ADMOrdersCards;
