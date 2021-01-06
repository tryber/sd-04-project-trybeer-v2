import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { NUMBER_ZERO } from '../../../../validation';

const excludeItem = (cart, setCartState, id) => {
  const newCart = cart.filter((item) => item.id !== parseInt(id, 10));
  setCartState(newCart);
  localStorage.setItem('cart', JSON.stringify([...newCart]));
};

const Products = ({ cartState, setCartState }) => {
  const calculateTotal = (yourCart) => {
    const total = yourCart.reduce(
      (sum, { price, quantity }) => sum + quantity * price, NUMBER_ZERO,
    );
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="products-container">
      <h2>Produtos</h2>
      {cartState.length > NUMBER_ZERO && (
        <ul>
          { cartState.map(({
            id, name, price, quantity,
          }, index) => (
            <li key={ id }>
              <p data-testid={ `${index}-product-qtd-input` }>{ quantity }</p>
              <p data-testid={ `${index}-product-name` }>{ name }</p>
              <p data-testid={ `${index}-product-total-value` }>
                {(price * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p data-testid={ `${index}-product-unit-price` }>
                {`(${price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} un)`}
              </p>
              <button
                value={ id }
                type="button"
                data-testid={ `${index}-removal-button` }
                onClick={ (event) => {
                  excludeItem(cartState, setCartState, event.target.value);
                } }
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
      { cartState.length < 1 && (
        <div className="cart-empty">
          <p>Não há produtos no carrinho</p>
        </div>
      )}
      <p data-testid="order-total-value">
        Total:&nbsp;
        { calculateTotal(cartState) }
      </p>
    </div>
  );
};

Products.propTypes = {
  cartState: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCartState: PropTypes.func.isRequired,
};

export default Products;
