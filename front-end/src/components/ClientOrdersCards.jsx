import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../store/ducks/orders';

import './ClientOrdersCards.css';

const zero = 0;
const ten = 10;
const twoLess = -2;
const two = 2;

const ClientOrdersCards = () => {
  const dispatch = useDispatch();
  // const order = useSelector((state) => state.ordersReducer.orders);
  const { session } = useSelector(
    (state) => state.userReducer,
  );

  // Fetch all orders at first render
  useEffect(() => {
    dispatch(getOrders(session.token));
  }, []);

  // call orders and fetch confirmation from redux
  const { orders, getOrderSuccess } = useSelector((state) => state.ordersReducer);
  let newDate = '';
  let dateAndMonth = '';
  let totalPrice = zero;
  let day = zero;
  let month = zero;
  let dateLength = zero;

  return (
    <div>
      {
        getOrderSuccess && orders.map((order, i) => {
          dateLength = order.sale_date.length;
          newDate = new Date(order.sale_date.slice(zero, dateLength - ten));
          day = ((`0${newDate.getDate()}`).slice(twoLess)); // Add 0 if day <10
          month = ((`0${newDate.getMonth()}${1}`).slice(twoLess)); // Add 0 if month <10
          dateAndMonth = `${day}/${month}`;
          totalPrice = order.total_price.toFixed(two).toString().replace('.', ',');
          return (
            <Link
              key={ order.id }
              to={ {
                pathname: `orders/${order.id}`,
                state: { // passing props para o child
                  date: dateAndMonth,
                  totalPrice,
                },
              } }
            >
              <div className="cardContainer" data-testid={ `${i}-order-card-container` }>
                <h3 data-testid={ `${i}-order-number` }>
                  Pedido
                  {order.id}
                </h3>
                <h3>{order.status}</h3>
                <h3 data-testid={ `${i}-order-date` }>
                  {
                  dateAndMonth
                }
                </h3>
                <h3 data-testid={ `${i}-order-total-value` }>
                  R$
                  {totalPrice}
                </h3>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
};

export default ClientOrdersCards;
