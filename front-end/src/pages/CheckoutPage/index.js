import React from 'react';
import Header from '../../components/Header';
import Checkout from '../../components/Checkout';

const CheckoutPage = () => (
  <div>
    <Header title="Finalizar Pedido" dataTestid="top-title" />
    <Checkout />
  </div>
);

export default CheckoutPage;
