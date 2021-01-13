import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesProducts } from '../../store/ducks/salesProducts';
// import UserService from '../../services/trybeerAPI';

import Header from '../../components/Header';

const zero = 0;

const OrderDetail = (props) => {
  const { dataFromOrders: { match, location } } = props;
  const { params: { id } } = match;
  const { state: { date, totalPrice } } = location;
  const dispatch = useDispatch();

  const { getSalesProductsSuccess, salesProducts } = useSelector(
    (state) => state.salesProductsReducer,
  );
  const { session } = useSelector((state) => state.userReducer);

  // Fetch all products from one sale at first render
  useEffect(() => {
    dispatch(
      getSalesProducts(session.token, id),
    );
  }, []);

  // const newDate = '';
  // const dateAndMonth = '';

  return (
    <>
      <Header />
      <h1>test</h1>
      <h3 data-testid="order-number">
        Pedido
        {' '}
        {id}
      </h3>
      {getSalesProductsSuccess && (
        <div>
          <h3 data-testid="order-date">
            {date}
          </h3>
          <h3>
            {' '}
            {salesProducts[0].sale.status}
          </h3>
          {salesProducts.map((product, i) => (
            <div className="cardContainer" key={ product.name }>
              <h3 data-testid={ `${i}-product-qtd` }>
                {' '}
                {product.quantity}
                {' '}
                -
                {' '}
              </h3>

              <h3 data-testid={ `${i}-product-name` }>
                {' '}
                {product.name}
              </h3>
              <h3 data-testid={ `${i}-product-total-value` }>
                R$
                {' '}
                {product.sale.total_price.toFixed(zero).toString().replace('.', ',')}
              </h3>
            </div>
          ))}
          <h3 data-testid="order-total-value">
            R$
            {' '}
            {totalPrice}
          </h3>
        </div>
      )}
    </>
  );
};

OrderDetail.propTypes = {
  dataFromOrders: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        date: PropTypes.string,
        totalPrice: PropTypes.string,
      }),
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default OrderDetail;
