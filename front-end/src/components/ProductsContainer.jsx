import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveToLocalStorage, loadFromLocalStorage } from '../services/localStorage';
import { addToCart, removeToCart, loadInitCart } from '../store/ducks/productsCart';
import { getProducts } from '../store/ducks/products';

import './ProductsContainer.css';

const zero = 0;
const two = 2;

const ProductsContainer = () => {
  const history = useHistory();

  let quantity = zero;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);

  const [total, setTotal] = useState(zero);

  const totalCart = () => {
    let totalSummed = zero;
    Object.keys(cart).forEach((key) => {
      if (cart[key].quantity > zero) {
        totalSummed += cart[key].price * cart[key].quantity;
      }
    });
    setTotal(totalSummed);
  };

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    totalCart();
    if (initialRender) {
      // To prevent to reset cart in local storage at first render
      setInitialRender(false);
    } else {
      saveToLocalStorage('cart', { cart });
    }
  }, [cart]);

  useEffect(() => {
    dispatch(getProducts());
    const cartFromLocalStorage = loadFromLocalStorage('cart');
    if (cartFromLocalStorage !== null) dispatch(loadInitCart(cartFromLocalStorage.cart));
  }, []);

  const { productsDB, productsFetching } = useSelector((state) => state.productsReducer);
  const handleGoToCheckOut = () => {
    saveToLocalStorage('cart', { cart });
    history.push('/checkout');
  };

  const handelClick = (type, product) => {
    if (type === 'plus') return dispatch(addToCart(product));
    return dispatch(removeToCart(product));
  };

  // const t = 0;
  let price = zero;

  return (
    <>
      <div className="cardsContainer">
        {productsFetching
          && productsDB.map(
            (product, i) => {
              if (cart[product.id] !== undefined) {
                quantity = cart[product.id].quantity;
              } else {
                quantity = zero;
              }
              price = product.price.toFixed(two).toString().replace('.', ',');
              return (
                <div className="productCard" key={ product.name }>
                  <span className="price" data-testid={ `${i}-product-price` }>
                    R$
                    {' '}
                    {price}
                  </span>
                  <img
                    data-testid={ `${i}-product-img` }
                    src={ product.url_image }
                    alt="test"
                    height="80px"
                  />
                  <h3 data-testid={ `${i}-product-name` }>{product.name}</h3>
                  <div className="quantityContainer">
                    <button
                      type="button"
                      data-testid={ `${i}-product-minus` }
                      className="productButton"
                      onClick={ () => handelClick('minus', product) }
                    >
                      -
                    </button>
                    <span data-testid={ `${i}-product-qtd` } className="quantity">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      data-testid={ `${i}-product-plus` }
                      className="productButton"
                      onClick={ () => handelClick('plus', product) }
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            },
          )}
      </div>
      <button
        type="button"
        disabled={ total === zero }
        data-testid="checkout-bottom-btn"
        onClick={ () => handleGoToCheckOut() }
      >
        Ver Carrinho
      </button>
      <h2 data-testid="checkout-bottom-btn-value">
        R$
        {' '}
        {total.toFixed(two).toString().replace('.', ',')}
      </h2>
    </>
  );
};

export default ProductsContainer;
