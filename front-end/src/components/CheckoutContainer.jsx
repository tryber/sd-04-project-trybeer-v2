import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadFromLocalStorage } from '../services/localStorage';
import { loadInitCart } from '../store/ducks/productsCart';
import CheckoutCards from './CheckoutCards';
import CheckoutForm from './CheckoutForm';

const zero = 0;
const two = 2;

const CheckoutContainer = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);

  // Each page loading, cart is load from localstorage
  useEffect(() => {
    const localStoreCart = loadFromLocalStorage('cart');
    if (localStoreCart !== null) dispatch(loadInitCart(localStoreCart.cart));

    // dispatch(loadInitCart(localStoreCart.cart));
  }, []);

  const [total, setTotal] = useState(zero);
  const totalCart = () => {
    let totalSummed = zero;
    Object.keys(cart).map((key) => {
      totalSummed += cart[key].price * cart[key].quantity;
      return totalSummed;
    });
    setTotal(totalSummed);
  };

  // const [_address, setAddress] = useState({
  //   street: '',
  //   number: '',
  // });

  useEffect(() => {
    totalCart();
  }, [cart]);

  return (
    <div>
      <CheckoutCards />
      <div className="form" />
      <h2 data-testid="order-total-value">
        R$
        {total.toFixed(two).toString().replace('.', ',')}
      </h2>
      <CheckoutForm total={ total } />
    </div>
  );
};
export default CheckoutContainer;
