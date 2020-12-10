import React from 'react';
import { Link } from 'react-router-dom';
import { Lupa } from '../images';
import '../css/orders.css';

export default function ListSales(props) {
  const {
    result: {
      id, total_price: totalPrice, sale_date: saleData,
    }, index,
  } = props;
  const priceArrendodado = totalPrice.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  const date = new Date(saleData).toLocaleDateString('pt-br', {
    day: '2-digit',
    month: 'numeric',
  });
  return (
    <Link to={ `/orders/${id}` } className="linkRemove">
      <div className="orderList" data-testid={ `${index}-order-card-container` }>
        <div className="listFlex">
          <span className="elements" data-testid={ `${index}-order-number` }>
            Pedido
            {' '}
            {id}
          </span>
          <span className="elements" data-testid={ `${index}-order-date` }>
            {date}
          </span>
          <span className="elements" data-testid={ `${index}-order-total-value` }>
            {priceArrendodado}
          </span>
          <img src={ Lupa } alt="lupa" />
        </div>
      </div>
    </Link>
  );
}
