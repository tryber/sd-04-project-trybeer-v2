import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context/Provider';
import styles from './index.module.css';

const zero = 0;

const Card = ({
  img, name, price, index, id,
}) => {
  const { cart, setCart } = useContext(Context);

  const incrementCounterHandler = (nameProd, priceProd, productId) => {
    const itemAdd = {
      id: productId, name: nameProd, quantity: 1, price: priceProd,
    };

    const itemInCart = cart.findIndex((product) => product.id === productId);
    const number = -1;

    if (itemInCart !== number) {
      return setCart(
        cart.map((product) => {
          if (product.id === productId) {
            const addQuantity = { ...product, ...(product.quantity += 1) };
            return addQuantity;
          } return product;
        }),
      );
    } return setCart([...cart, itemAdd]);
  };

  const decrementCounterHandler = (productId) => {
    const itemInCart = cart.findIndex((product) => product.id === id);

    if (itemInCart >= zero && cart[itemInCart].quantity > zero) {
      return setCart(
        cart.map((product) => {
          if (product.id === productId) {
            const subtractQuantity = { ...product, ...(product.quantity -= 1) };
            return subtractQuantity;
          } return product;
        }),
      );
    }

    if (itemInCart >= zero && cart[itemInCart].quantity === zero) {
      setCart(cart.filter((item) => item.quantity > zero));
    }

    return null;
  };

  return (
    <div className={ styles.cardContainer }>
      <img
        src={ img }
        alt={ name }
        className={ styles.cardImg }
        data-testid={ `${index}-product-img` }
      />
      <span data-testid={ `${index}-product-name` }>{name}</span>
      <span data-testid={ `${index}-product-price` }>
        {`${price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`}
      </span>
      <div className={ styles.buttonContainer }>
        <button
          data-testid={ `${index}-product-minus` }
          onClick={ () => decrementCounterHandler(id) }
          type="button"
          className={ styles.buttonQnt }
        >
          -
        </button>
        <span data-testid={ `${index}-product-qtd` }>
          {!cart.filter((item) => item.id === id)[0]
            ? zero
            : cart.filter((item) => item.id === id)[0].quantity}
        </span>
        <button
          data-testid={ `${index}-product-plus` }
          onClick={ () => incrementCounterHandler(name, price, id) }
          type="button"
          className={ styles.buttonQnt }
        >
          +
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;
