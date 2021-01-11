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
      { `${orders.delivery_address}, ${orders.delivery_number}` }
    </span>
    <br />
    <span className="bold-text" data-testid={ `${testid}-order-total-value` }>
      { orders.total_price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
    </span>
    <button type="button" data-testid={ `${testid}-order-status` }>{ orders.status }</button>
  </div>
);

ADMOrdersCards.propTypes = {
  testid: PropTypes.number.isRequired,
  orders: PropTypes.shape({
    id: PropTypes.number,
    delivery_address: PropTypes.string,
    delivery_number: PropTypes.number,
    status: PropTypes.string,
    total_price: PropTypes.number,
  }).isRequired,
};

export default ADMOrdersCards;
