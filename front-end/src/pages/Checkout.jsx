import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { saveCart } from '../actions';

import Menu from '../components/Menu';

import { updateTotalCheckout, updateCart } from '../actions';

const Checkout = ({ cart, total, updateTotal, updateProducts, saveCartLS }) => {
  const [userLS, setUserLS] = useState(null);

  // dados para registrar a venda
  const [userId, setUserId] = useState('');
  const [price, setPrice] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 19).replace('T', ' '),
  );
  const [status, setStatus] = useState('Pendente');
  ///////////////////////////////////////////////////////////

  // dados para o insert na tabela sales_products
  const [productId, setProductId] = useState();
  const [quantity, setQuantity] = useState();
  ///////////////////////////////////////////////////////

  const [messageCart, setMessageCart] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');

  const [redirect, setRedirect] = useState(false);
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
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserLS(userData);
    saveCart();
  }, []);

  // requisição para pegar o id do usuário no banco
  if (userLS) {
    axios
      .get('http://localhost:3001/users', {
        params: { email: userLS.email },
      })
      .then((res) => {
        setUserId(res.data[0]);
        localStorage.setItem('userID', userId);
      })
      .catch((error) => console.log(error));
  }
  //////////////////////////////////////////////////

  useEffect(() => {
    setPrice(total);
    if (cart.length === 0) {
      return setMessageCart('Não há produtos no carrinho');
    }
    setMessageCart('');
  }, [cart, total]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);

    setProductId(cart.map((item) => item.id));
    setQuantity(cart.map((item) => item.quantity));
  }, [cart, total]);

  const removeProduct = (item) => {
    const totalProductValue = item.price * item.quantity;
    updateProducts(item);
    updateTotal(totalProductValue);
  };

  const registerSale = () => {
    axios
      .post('http://localhost:3001/sales', {
        userId,
        price,
        street,
        houseNumber,
        date,
        status,
        productId,
        quantity,
      })
      .then((_res) => {
        setMessageSuccess('Compra realizada com sucesso!');
        setTimeout(() => setRedirect(true), 2000);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerSale();
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
  };

  if (redirect) return <Redirect to="/products" />;

  return (
    <div>
      {redirectToLogin && <Redirect to="/login" />}
      <Menu title="Finalizar Pedido" />
      <h2>Produtos</h2>
      {messageCart && <h3>{messageCart}</h3>}
      {cart &&
        cart.map((item, index) => (
          <div key={item.name}>
            <p data-testid={`${index}-product-name`}>{item.name}</p>
            <p
              data-testid={`${index}-product-unit-price`}
            >{`(R$ ${item.price.toFixed(2).replace('.', ',')} un)`}</p>
            <p data-testid={`${index}-product-qtd-input`}>{item.quantity}</p>
            <p data-testid={`${index}-product-total-value`}>{`R$ ${(
              item.price * item.quantity
            )
              .toFixed(2)
              .replace('.', ',')}`}</p>
            <button
              type="button"
              data-testid={`${index}-removal-button`}
              onClick={() => removeProduct(item)}
            >
              X
            </button>
          </div>
        ))}
      <p data-testid="order-total-value">{`R$ ${total
        .toFixed(2)
        .replace('.', ',')}`}</p>
      <h2>Endereço</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="street">
          Rua:
          <input
            type="text"
            name="street"
            id="street"
            data-testid="checkout-street-input"
            onChange={(e) => setStreet(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="number">
          Número da casa:
          <input
            type="text"
            name="number"
            id="number"
            data-testid="checkout-house-number-input"
            onChange={(e) => setHouseNumber(e.target.value)}
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="checkout-finish-btn"
          disabled={!street || !houseNumber || !price}
        >
          Finalizar Pedido
        </button>
      </form>
      {messageSuccess && <h3>{messageSuccess}</h3>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  total: state.cartReducer.total,
});

const mapDispatchToProps = (dispatch) => ({
  updateTotal: (payload) => dispatch(updateTotalCheckout(payload)),
  updateProducts: (payload) => dispatch(updateCart(payload)),
  saveCartLS: (localstorage, total) => dispatch(saveCart(localstorage, total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
