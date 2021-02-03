import { useHistory } from 'react-router-dom';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import TopBar from '../components/ClientBar';
import { AppContext } from '../context/AppContext';
import api from '../services/api';
import './CloseOrder.css';

const zero = 0;
const dois = 2;

function CloseOrder() {
  const {
    cart, setCart, total, setTotal,
  } = useContext(AppContext);
  const { orderMessage, setOrderMessage } = useContext(AppContext);

  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState('');

  const orderRef = useRef(null);
  const hist = useHistory();

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
      //  console.log(`eu so log do useffect: total: ${total}`);
      const loginInStorage = JSON.parse(localStorage.getItem('user'));
      setEmail(loginInStorage.userEmail);
      //  console.log(loginInStorage.userEmail);
      setTotal(JSON.parse(localStorage.getItem('totalPrice')));
    }
    const loginInStorage = JSON.parse(localStorage.getItem('user'));

    if (!loginInStorage) {
      hist.push('/login');
    }
  }, []);

  const postData = async (
    postEmail,
    postTotal,
    postAddress,
    postNumber,
    postDate,
    postProducts,
  ) => {
    await api.post('/checkout', {
      email: postEmail,
      total: postTotal,
      address: postAddress,
      number: postNumber,
      date: postDate,
      products: postProducts,
      status: 'Pendente',
    });
  };

  const makeTotalValue = (newCart) => {
    const totalPrice = document.getElementById('itemTotal');

    if (newCart.length > zero) {
      const sum = newCart
        .map(({ price, quantity }) => price * quantity)
        .reduce((acc, curr) => acc + curr);
      totalPrice.innerText = `R$ ${sum
        .toFixed(dois)
        .toString()
        .replace('.', ',')}`;
      localStorage.setItem('totalPrice', JSON.stringify(sum));
      setTotal(sum);
    } else {
      totalPrice.innerHTML = 'Total: R$ 0,00';
      setMessage('Não há produtos no carrinho');
    }
  };

  useEffect(() => {
    makeTotalValue(cart);
  }, [total]);

  const removeItemFromArray = (product) => {
    const newArr = cart.filter((value) => value.name !== product);
    setCart(newArr);
    makeTotalValue(newArr);
    localStorage.setItem('cart', JSON.stringify(newArr));
  };

  const history = useHistory();

  const setStore = () => {
    const storeCart = JSON.parse(localStorage.getItem('cart'));
    const newCart = [];
    storeCart.forEach((item) => {
      const newItem = { ...item, address: `${address}, ${number}` };
      newCart.push(newItem);
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(JSON.parse(localStorage.getItem('cart')));
  };

  function doneOrder(frase, seOMessage) {
    seOMessage(frase);
    const orderDate = new Date();
    setData(orderDate);
    setStore();
    //  console.log(`eu sou o log do doneOrder: ${total}`);
    //  console.log(`dados posDAta: ${JSON.stringify(email)}, ${total}, ${address}, ${number}, ${orderDate}, ${JSON.stringify(cart)})`);
    postData(email, total, address, number, orderDate, cart);
    localStorage.removeItem('cart');
    history.push('/products');
  }

  return (
    <div>
      <TopBar title="Finalizar Pedido" isAdm={ false } />
      <div className="container">
        <div className="col-lg-15">
          <h1>Produtos</h1>
          <h3>{message}</h3>
          <p id="orderMessage">{orderMessage}</p>
          <ul ref={ orderRef } id="list" className="list-group">
            {cart.map(({ name, quantity, price }, index) => (
              <li
                name="itemList"
                id={ name }
                key={ name }
                className="list-group-item list-group-item-action list-group-item-primary"
                index={ index }
              >
                <div className="">
                  <div className="row">
                    <div
                      data-testid={ `${index}-product-qtd-input` }
                      className="col"
                    >
                      {quantity}
                    </div>
                    <div
                      data-testid={ `${index}-product-name` }
                      className="col-6"
                    >
                      {name}
                    </div>
                    <div
                      data-testid={ `${index}-product-unit-price` }
                      className="price"
                    >
                      {`(R$ ${price
                        .toFixed(dois)
                        .toString()
                        .replace('.', ',')} un)`}
                    </div>
                    <div
                      data-testid={ `${index}-product-total-value` }
                      className="price"
                    >
                      {`R$ ${(price * quantity)
                        .toFixed(dois)
                        .toString()
                        .replace('.', ',')}`}
                    </div>

                    <input type="hidden" name="total" value={ total } />
                    <input type="hidden" name="products" value={ cart } />
                    <input type="hidden" name="date" value={ data } />

                    <button
                      type="button"
                      onClick={ () => removeItemFromArray(name) }
                      className="col"
                    >
                      <button
                        type="button"
                        data-testid={ `${index}-removal-button` }
                        className="btn btn-danger"
                      >
                        X
                      </button>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <br />
          <h4
            className="order-total"
            data-testid="order-total-value"
            id="itemTotal"
          >
            {' '}
          </h4>
        </div>
      </div>

      <hr />

      <div className="container end">
        <div className="col-lg-8 col-offset-6 centered">
          <form method="POST" action="">
            <h3>Dados para Entrega</h3>
            <label htmlFor="inputEnd">
              Rua:
              <input
                onChange={ (e) => setAddress(e.target.value) }
                id="inputEnd"
                name="adrress"
                data-testid="checkout-street-input"
                type="text"
                className="form-control"
              />
            </label>
            <br />
            <label htmlFor="number" className="">
              Número da casa:
              <input
                name="number"
                id="number"
                onChange={ (e) => setNumber(e.target.value) }
                data-testid="checkout-house-number-input"
                type="text"
                className="form-control col-6"
              />
            </label>
          </form>
          <br />
          <br />
          <button
            type="button"
            id="inputNum"
            data-testid="checkout-finish-btn"
            className="btn btn-outline-success"
            disabled={ !address || !number || !cart.length > zero }
            onClick={ () => doneOrder('Compra realizada com sucesso!', setOrderMessage) }
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CloseOrder;
