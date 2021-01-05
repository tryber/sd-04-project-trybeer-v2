import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Cart() {
  const { cart, total } = useContext(AppContext);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p />
      {cart.map((item) => (
        <p key={ item.id }>
          {item.name}
          -
          {item.quantity}
          -
          R$
          {item.price}
        </p>
      ))}
      {total}
    </div>
  );
}

export default Cart;
