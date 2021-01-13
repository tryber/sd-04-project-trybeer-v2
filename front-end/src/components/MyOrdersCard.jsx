import React from 'react';
import { Link } from 'react-router-dom';
import './MyOrdersCard.css';

function MyOrdersCard({ index, orderId, orderDate, orderPriceSum }) {
  console.log(index);
  const redirect = () => {
      return window.location.replace(`http://localhost:3000/orders/${orderId}`);
  };
  const day = orderDate.substring(8,10);
  const month = orderDate.substring(5,7);

  return (
    <Link to={`/orders/${orderId}`} style={{textDecoration:"none"}}>
    <div data-testid={`${index}-order-card-container`} className='order-card'>
      <p className="order-number" data-testid={`${index}-order-number`}>{`Pedido ${orderId}`}</p>
      <p data-testid={`${index}-order-date`}>{`${day}/${month}`}</p>
      <p data-testid={`${index}-order-total-value`}>{`R$ ${orderPriceSum.toFixed(2).toString().replace('.', ',')}`}</p>
    </div>
    </Link>
  )
};

export default MyOrdersCard;
