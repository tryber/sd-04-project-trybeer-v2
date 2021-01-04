import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import CheckoutCard from '../../components/CheckoutCard';
import MenuClient from '../../components/MenuClient';
import { ProductContext } from '../../context';
import { postCheckout } from '../../api';

const Checkout = () => {
  const zero = 0;
  const userId = localStorage.user ? jwtDecode(localStorage.user).id : null;
  const { cartValue } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [addressValue, setAddressValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [message, setMessage] = useState('');
  const emptyCart = 'Não há produtos no carrinho';

  const history = useHistory();

  // seta valor do endereco no estado local
  function handleNumber(e) {
    setNumberValue(e.target.value);
  }

  // seta valor do numero no estado local
  function handleAddress(e) {
    setAddressValue(e.target.value);
  }

  const handleResult = async (result) => {
    const statusCode = 200;
    const timoteo = 5000;
    if (result.status === statusCode) {
      setMessage('Compra realizada com sucesso!');
      localStorage.cartItens = [];
      setTimeout(() => {
        history.push('/products');
      }, timoteo);
    }
  };

  // faz a requisicao pro back, se o retorno for ok retorna msg de sucesso se n de erro
  // limpa o localstorage se for ok e redireciona pra tela de produtos
  // envia pro backend userid, valor total da compra, endereco de entrega, data do pedido e status
  const handleSubmit = async (event) => {
    event.preventDefault();
    const status = 'Pendente';

    const datas = new Date().toISOString()
      .replace('T', ' ')
      .replace('Z', '');

    const sliceNum = 3;
    const newCartValue = cartValue.slice(sliceNum);
    const floatCartValue = parseFloat(newCartValue.replace(',', '.'));

    const result = await postCheckout(
      products, status, datas, userId, floatCartValue, addressValue, numberValue,
    );

    if (result) handleResult(result);
    setMessage('Compra realizada com sucesso!');
  };

  // quando a pag renderiza checa se tem user e cria estado local com produtos
  useEffect(() => {
    if (!localStorage.user) history.push('/login');
    const storageList = localStorage.cartItens ? JSON.parse(localStorage.cartItens) : [];

    setProducts(storageList);
  }, [history]);

  return (
    <div>
      <MenuClient header="Finalizar Pedido" />
      {cartValue > zero ? null : <h5>{emptyCart}</h5>}
      {message ? <h5>{message}</h5> : null}
      {products ? products.map((e) => <CheckoutCard data={ e } key={ e.id } />) : <p>loading</p> }
      <h5 data-testid="order-total-value">{cartValue}</h5>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="address">
          Rua
          <input
            type="text"
            data-testid="checkout-street-input"
            name="addressValue"
            id="address"
            required
            onChange={ handleAddress }
          />
        </label>
        <label htmlFor="number">
          Número da casa
          <input
            type="number"
            data-testid="checkout-house-number-input"
            name="numberValue"
            id="number"
            required
            onChange={ handleNumber }
          />
        </label>
        <button
          disabled={ !products || !addressValue || !numberValue }
          type="submit"
          data-testid="checkout-finish-btn"
          // onClick={ () => {} }
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
};
export default Checkout;
