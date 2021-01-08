import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { postOrder } from '../services/TrybeerApi';
import { removeAllCart } from '../redux/actions';
import { happy } from '../images';
import '../css/checkoutPage.css';

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem('user') || null);
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState('');
  const [nameAdress, setNameAdress] = useState('');
  const [numberAdress, setNumberAdress] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const removeItemCart = (index) => {
    cart.splice(index, 1);
    setRefresh(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const totalPrice = cart.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);

  const requestApi = async () => {
    const response = await postOrder(nameAdress, numberAdress, cart, user, totalPrice);
    if (response.data.message) {
      dispatch(removeAllCart());
      setTimeout(() => {
        history.push('/products');
      }, 2000);
      setMessage(response.data.message);
    }
  };

  useEffect(() => {
    setCart(Object.values(JSON.parse(localStorage.getItem('cart')) || []));
  }, [refresh]);

  return (
    <div className="page">
      <Header>Finalizar Pedido</Header>
      <div className="page-content checkout">
        <h2>Produtos</h2>
        <div className="checkout-list">
          { cart.length < 1 && <h2>Não há produtos no carrinho</h2> }

          { cart.map(({
            price, name, quantity, url_image: urlImage,
          }, index) => (
            <div className="cart-product" key={ name }>
              <img className="cart-img" src={ urlImage } alt={ name } />
              <div className="cart-name" data-testid={ `${index}-product-name` }>{ name }</div>
              <div className="cart-qtd" data-testid={ `${index}-product-qtd-input` }>{ quantity }</div>
              <div className="cart-price" data-testid={ `${index}-product-unit-price` }>
                { `(${price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} un)` }
              </div>
              <div className="cart-total" data-testid={ `${index}-product-total-value` }>
                { `${(quantity * price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` }
                <button
                  type="submit"
                  value="Submit"
                  data-testid={ `${index}-removal-button` }
                  onClick={ () => removeItemCart(index) }
                >
                  X
                </button>
              </div>
            </div>
          )) }
        </div>
        <div data-testid="order-total-value" className="order-total-value">
          { `Total: ${totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` }
        </div>

        <h2>Endereço</h2>
        <div className="checkout form">
          <label htmlFor="street">
            Rua:
            <input
              id="street"
              name="street"
              data-testid="checkout-street-input"
              type="text"
              required
              onChange={ (e) => setNameAdress(e.target.value) }
              value={ nameAdress }
            />
          </label>
          <label htmlFor="number">
            Número da casa:
            <input
              id="number"
              name="number"
              data-testid="checkout-house-number-input"
              type="text"
              required
              onChange={ (e) => setNumberAdress(e.target.value) }
              value={ numberAdress }
            />
          </label>
          <button
            type="button"
            data-testid="checkout-finish-btn"
            disabled={ totalPrice <= 0 || !nameAdress || !numberAdress }
            onClick={ () => requestApi() }
          >
            Finalizar Pedido
          </button>
        </div>
        {
        message && (
          <div className="success-message">
            { message }
            <img src={ happy } alt="Homer happy" />
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Checkout;
