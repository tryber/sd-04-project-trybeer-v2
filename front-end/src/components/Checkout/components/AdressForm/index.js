import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from '../../../../context';
import { CHECKOUT_TIME } from '../../../../validation';

import api from '../../../../services/api';

import './style.css';

const AdressForm = () => {
  const { cartState } = useContext(Context);
  const history = useHistory();
  const [rua, setRua] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [message, setMessage] = useState('');

  const validateCheckoutButton = (ruaEnd, numeroEnd) => ruaEnd === '' || numeroEnd === '';

  const getPurchasedProducts = (myItems) => myItems.map(
    ({ id, quantity }) => ({ id, quantity }),
  );

  useEffect(() => {
    let saleMessageTimeOut;
    if (message !== '') {
      saleMessageTimeOut = setTimeout(() => history.push('/products'), CHECKOUT_TIME);
    }
    return () => clearTimeout(saleMessageTimeOut);
  }, [message, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id: userId } = JSON.parse(localStorage.getItem('user'));
    const total = JSON.parse(localStorage.getItem('totalCarrinho'));
    const status = 'Pendente';
    const purchasedProducts = getPurchasedProducts(cartState);
    const response = await api.post('/checkout', {
      userId, total, rua, numeroCasa, status, purchasedProducts,
    });
    setMessage(response.data.message);
  };

  return (
    <div className="adress-form-container">
      <h2>Endereço</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="street">
          Rua
          <input
            data-testid="checkout-street-input"
            type="text"
            id="street"
            value={ rua }
            onChange={ (e) => setRua(e.target.value) }
          />
        </label>
        <label htmlFor="number">
          Número da casa
          <input
            data-testid="checkout-house-number-input"
            type="text"
            id="number"
            value={ numeroCasa }
            onChange={ (e) => setNumeroCasa(e.target.value) }
          />
        </label>
        <button
          data-testid="checkout-finish-btn"
          type="submit"
          disabled={ validateCheckoutButton(rua, numeroCasa) }
        >
          Finalizar Pedido
        </button>
      </form>
      <span>{ message }</span>
    </div>
  );
};

export default AdressForm;
