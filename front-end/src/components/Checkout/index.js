import React, { useContext, useEffect } from 'react';

import Products from './components/Products';
import AdressForm from './components/AdressForm';

import { Context } from '../../context';

import { NUMBER_ZERO } from '../../validation';

import './style.css';

const Checkout = () => {
  const { cartState, setCartState } = useContext(Context);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('products'));
    if (cart) {
      const myProducts = cart.filter(({ quantity }) => quantity !== NUMBER_ZERO);
      setCartState(myProducts);
    }
  }, [setCartState]);

  return (
    <div className="checkout-container">
      <Products cartState={ cartState } setCartState={ setCartState } />
      <AdressForm cartState={ cartState } />
    </div>
  );
};

export default Checkout;
