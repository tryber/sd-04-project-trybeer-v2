import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const OrderCard = ({
  id, totalPrice, saleDate, index, status,
}) => (
  <Link
    to={ `/orders/${id}` }
    key={ `order-${index}` }
    className={ styles.cartItem }
  >
    <div
      className={ styles.cartItemContainer }
      data-testid={ `${index}-order-card-container` }
    >
      <h3 data-testid={ `${index}-order-number` } className={ styles.order }>
        {`Pedido ${index + 1}`}
      </h3>
      <h4
        className={ styles.orderValue }
        data-testid={ `${index}-order-total-value` }
      >
        {`${Number(totalPrice).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`}
      </h4>
      <h4 data-testid={ `${index}-order-date` } className={ styles.orderDate }>
        {new Date(saleDate).toLocaleDateString('pt-BR')}
      </h4>
      <h4>{ status }</h4>
    </div>
  </Link>
);

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrderCard;
