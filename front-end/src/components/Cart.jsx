import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Cart() {
  const { cart, total } = useContext(AppContext);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p></p>
      {cart.map((item, i) => (
        <p key={i}>{item.name} - {item.quantity} - R$ {item.price}</p>
      ))}
      {total}
    </div>
  )
};

export default Cart;
