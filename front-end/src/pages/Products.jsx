import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { incQuantity, decQuantity, saveCart } from '../actions';

import Menu from '../components/Menu';

const Products = ({ cart, increaseQtd, decreaseQtd, total, saveCartLS }) => {
  const [products, setProducts] = useState([]);

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const saveCart = () => {
    const cartLS = JSON.parse(localStorage.getItem('cart')) || [];
    const totalLS = JSON.parse(localStorage.getItem('total'));
    return cartLS ? saveCartLS(cartLS, totalLS) : null;
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      return setRedirectToLogin(true);
    }

    if (localStorage.getItem('user')) {
      axios
        .get('http://localhost:3001/users', {
          params: { email: JSON.parse(localStorage.getItem('user')).email },
        })
        .then((res) => {
          localStorage.setItem('userID', res.data[0]);
        })
        .catch((error) => console.log(error));
    }

    axios
      .get('http://localhost:3001/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => console.log(error));
    saveCart();
  }, []);

  const quantity = (product) => {
    let qty;
    const productInCart = cart.filter((item) => item.name === product.name);
    productInCart.length ? (qty = productInCart[0].quantity) : (qty = 0);
    return qty;
  };

  useEffect(() => {
    localStorage.setItem('total', total);
    if (cart !== []) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, total]);

  const stopDecrement = (product) => {
    const qty = quantity(product);
    if (qty === 0 || !qty) return null;
    decreaseQtd(product);
  };

  return (
    <div>
      {redirectToLogin && <Redirect to="/login" />}
      <Menu title="TryBeer" />
      {products &&
        products.map((product, index) => (
          <div key={product.name}>
            <p data-testid={`${index}-product-name`}>{product.name}</p>
            <p
              data-testid={`${index}-product-price`}
            >{`R$ ${product.price.toFixed(2).replace('.', ',')}`}</p>
            <img
              data-testid={`${index}-product-img`}
              alt=""
              src={product.urlImage}
              width="100px"
            />
            <button
              type="button"
              data-testid={`${index}-product-minus`}
              onClick={() => stopDecrement(product)}
            >
              -
            </button>
            <p data-testid={`${index}-product-qtd`}>{quantity(product)}</p>
            <button
              type="button"
              data-testid={`${index}-product-plus`}
              onClick={() => increaseQtd(product)}
            >
              +
            </button>
          </div>
        ))}
      <div>
        <Link to="/checkout">
          <button
            type="button"
            data-testid="checkout-bottom-btn"
            disabled={!cart.length}
          >
            Ver Carrinho
          </button>
        </Link>
        <p data-testid="checkout-bottom-btn-value">
          {total === null
            ? 'R$ 0,00'
            : `R$ ${total.toFixed(2).replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  total: state.cartReducer.total,
});

const mapDispatchToProps = (dispatch) => ({
  increaseQtd: (payload) => dispatch(incQuantity(payload)),
  decreaseQtd: (payload) => dispatch(decQuantity(payload)),
  saveCartLS: (localstorage, total) => dispatch(saveCart(localstorage, total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
