import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardProduct from './CardProduct';
import '../../css/pageProducts.css';

const ListProducts = ({ list }) => {
  const cart = useSelector((state) => state.cart);
  const carrinho = Object.entries({ ...list, ...cart });
  const total = Object.values(cart)
    .reduce((acc, curr) => curr.quantity * curr.price + acc, 0)
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const onClick = (e) => {
    if (e.target.innerHTML.indexOf('0,00') !== -1) return e.preventDefault();
    return false;
  };

  return (
    <div className="page-content products-page">
      <div className="products-page">
        {carrinho.map((info, index) => (
          <CardProduct
            key={ info[0] }
            info={ info[1] }
            quantity={ info[1].quantity }
            index={ index }
          />
        ))}
      </div>
      <button
        disabled={ Object.keys(cart).length === 0 }
        data-testid="checkout-bottom-btn"
        type="button"
        className="cart-button"
      >
        <Link to="/checkout" onClick={ onClick }>
          <p data-testid="checkout-bottom-btn-value">{`Ver Carrinho: ${total}`}</p>
        </Link>
      </button>
    </div>
  );
};

export default ListProducts;
