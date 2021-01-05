import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { NUMBER_ZERO } from '../../validation';

import './styles.css';

const OrderedsCard = ({
  testid, orderNumber, total, saleDate,
}) => {
  const [day, month] = saleDate.substring(NUMBER_ZERO, saleDate.indexOf('T')).split('-').reverse();

  const history = useHistory();
  const adminOrdersCards = () => (
    <div className="admin-order-screen-details">
      <span className="order-address">Endereço</span>
      <br />
      <span className="order-situation">Pendente/Entregue</span>
    </div>
  );

  return (
    <div className="orders-card-body">
      <div className="ordereds-info">
        <Link to={ `/orders/${orderNumber}` } className="bold-text" data-testid={ `${testid}-order-number` }>
          { `Pedido ${orderNumber}` }
        </Link>
        <span data-testid={ `${testid}-order-date` }>{ `${day}/${month}` }</span>
      </div>
      { history.location.pathname === '/admin/orders' && adminOrdersCards() }
      <span className="bold-text" data-testid={ `${testid}-order-total-value` }>
        { total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
      </span>
    </div>
  );
};

OrderedsCard.defaultProps = {
  saleDate: '',
};

OrderedsCard.propTypes = {
  testid: PropTypes.number.isRequired,
  orderNumber: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  saleDate: PropTypes.string,
};

export default OrderedsCard;
