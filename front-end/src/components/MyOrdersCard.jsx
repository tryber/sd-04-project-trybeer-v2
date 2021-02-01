import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './MyOrdersCard.css';

function MyOrdersCard({
  index, orderId, orderDate, orderPriceSum, orderStatus,
}) {
  // const redirect = () => window.location.replace(`http://localhost:3000/orders/${orderId}`);

  // Constantes declaradas para passar no lint. É a posição inical e final da string date
  const daySubstrStart = 8;
  const daySubstrEnd = 10;
  const monthSubstrStart = 5;
  const monthSubstrEnd = 7;

  const day = orderDate.substring(daySubstrStart, daySubstrEnd);
  const month = orderDate.substring(monthSubstrStart, monthSubstrEnd);
  const dois = 2;

  return (
    <Link to={ `/orders/${orderId}` } style={ { textDecoration: 'none' } }>
      <div data-testid={ `${index}-order-card-container` } className="order-card">
        <p className="order-number" data-testid={ `${index}-order-number` }>{`Pedido ${orderId}`}</p>
        <p data-testid={ `${index}-order-date` }>{`${day}/${month}`}</p>
        <p data-testid={ `${index}-order-total-value` }>{`R$ ${orderPriceSum.toFixed(dois).toString().replace('.', ',')}`}</p>
        <p>{orderStatus}</p>
      </div>
    </Link>
  );
}

MyOrdersCard.propTypes = {
  index: PropTypes.number.isRequired,
  orderDate: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
  orderPriceSum: PropTypes.shape({
    toFixed: PropTypes.func,
  }).isRequired,
};

export default MyOrdersCard;
