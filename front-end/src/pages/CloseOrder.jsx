import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TopBar from '../components/ClientBar.jsx';
import { AppContext } from '../context/AppContext';
import api from '../services/api.js';
import './CloseOrder.css';

function CloseOrder() {
  const { cart, setCart, total, setTotal } = useContext(AppContext);
  const { orderMessage, setOrderMessage } = useContext(AppContext);

  const [message, setMessage] = useState('');
  const [address, setAddress] = useState(null);
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);

  const orderRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
      console.log(`eu so log do useffect: total: ${total}`)
      const loginInStorage = JSON.parse(localStorage.getItem('user'));
      setEmail(loginInStorage.email);
      setTotal(JSON.parse(localStorage.getItem('totalPrice')));
    }
    const loginInStorage = JSON.parse(localStorage.getItem('user'));

    if (!loginInStorage) {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    makeTotalValue(cart);
  }, [total]);

  const postData = async (email, total, address, number, date, products) => {
    console.log('AQUI JAZ OS DADOS', {
      email,
      total,
      address,
      number,
      date,
      products,
    });
    await api.post('/checkout', {
      email,
      total,
      address,
      number,
      date,
      products,
    });
  };

  const makeTotalValue = (cart) => {
    let totalPrice = document.getElementById('itemTotal');

    if (cart.length > 0) {
      const sum = cart
        .map(({ price, quantity }) => {
          return price * quantity;
        })
        .reduce((acc, curr) => acc + curr);
      totalPrice.innerText = `R$ ${sum
        .toFixed(2)
        .toString()
        .replace('.', ',')}`;
      localStorage.setItem('totalPrice', JSON.stringify(sum));
      setTotal(sum);
    } else {
      totalPrice.innerHTML = 'Total: R$ 0,00';
      setMessage('Não há produtos no carrinho');
    }
  };

  const removeItemFromArray = (product) => {
    let newArr = cart.filter((value, index, arr) => value.name !== product);
    setCart(newArr);
    makeTotalValue(newArr);
    localStorage.setItem('cart', JSON.stringify(newArr));
  };

  const history = useHistory();

  const setStore = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = [];
    cart.forEach((item) => {
      const newItem = {...item, address: `${address}, ${number}`};
      newCart.push(newItem);
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(JSON.parse(localStorage.getItem('cart')));
  };

  function doneOrder(history, frase, seOMessage) {
    seOMessage(frase);
    const orderDate = new Date();
    setData(orderDate);
    setStore();
    console.log(`eu sou o log do doneOrder: ${total}`)
    postData(email, total, address, number, orderDate, cart);
    localStorage.removeItem('cart');
    history.push('/products');
  }

  return (
    <div>
      <TopBar title={'Finalizar Pedido'} isAdm={false} />
      <div className="container">
        <div className="col-lg-15">
          <h1>Produtos</h1>
          <h3>{message}</h3>
          <p id="orderMessage">{orderMessage}</p>
          <ul ref={orderRef} id="list" className="list-group">
            {cart.map(({ name, quantity, price }, index) => {
              return (
                <li
                  name="itemList"
                  id={name}
                  key={name}
                  className="list-group-item list-group-item-action list-group-item-primary"
                  index={index}
                >
                  <div className="">
                    <div className="row">
                      <div
                        data-testid={`${index}-product-qtd-input`}
                        className="col"
                      >
                        {quantity}
                      </div>
                      <div
                        data-testid={`${index}-product-name`}
                        className="col-6"
                      >
                        {name}
                      </div>
                      <div
                        data-testid={`${index}-product-unit-price`}
                        className="price"
                      >
                        {`(R$ ${price
                          .toFixed(2)
                          .toString()
                          .replace('.', ',')} un)`}
                      </div>
                      <div
                        data-testid={`${index}-product-total-value`}
                        className="price"
                      >
                        {`R$ ${(price * quantity)
                          .toFixed(2)
                          .toString()
                          .replace('.', ',')}`}
                      </div>

                      <input type="hidden" name="total" value={total} />
                      <input type="hidden" name="products" value={cart} />
                      <input type="hidden" name="date" value={data} />

                      <div
                        onClick={(e) => removeItemFromArray(name)}
                        className="col"
                      >
                        <button
                          data-testid={`${index}-removal-button`}
                          className="btn btn-danger"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <br />
          <h4 className="order-total" data-testid="order-total-value" id="itemTotal"></h4>
        </div>
      </div>

      <hr />

      <div className="container end">
        <div className="col-lg-8 col-offset-6 centered">
          <form method="POST" action="">
            <h3>Dados para Entrega</h3>
            <label htmlFor="rua">Rua:</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              id="inputEnd"
              name="adrress"
              data-testid="checkout-street-input"
              type="text"
              className="form-control"
            />
            <br />
            <label htmlFor="numberCasa" className="">
              Número da casa:
            </label>
            <input
              name="number"
              onChange={(e) => setNumber(e.target.value)}
              data-testid="checkout-house-number-input"
              type="text"
              className="form-control col-6"
            />
          </form>
          <br />
          <br />
          <button
            id="inputNum"
            data-testid="checkout-finish-btn"
            className="btn btn-outline-success"
            disabled={!address || !number || !cart.length > 0}
            onClick={() =>
              doneOrder(
                history,
                'Compra realizada com sucesso!',
                setOrderMessage
              )
            }
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CloseOrder;
