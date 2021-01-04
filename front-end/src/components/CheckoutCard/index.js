import React, { useEffect, useContext } from 'react';
import { ProductContext } from '../../context';

export default function CheckoutCard(data) {
  // chama o contex para atualizar o valor do carrinho
  const {
    setCartValue, totalValue, cartItens, setCartItens,
  } = useContext(ProductContext);

  // dados recebidos de props
  const {
    name, price, quantity, id,
  } = data.data;
  const finalPrice = `(${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })} un)`;
  const valorTotal = (quantity * price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });

  // funcao de remocao do produto
  function handleClick(ida, productsLista, setProductsLista) {
  // retira o produto da lista de produtos
    const newStorage = productsLista.filter((ele) => ele.id !== ida);
    // atualiza a lista de prodtos
    setProductsLista(newStorage);
    localStorage.cartItens = JSON.stringify(newStorage);
    // remove a div do produto
    document.getElementById(`${ida}`).remove();
  }

  // quando monta o card cria a lista local de produtos
  useEffect(() => {
    const storage = localStorage.cartItens ? JSON.parse(localStorage.cartItens) : [];
    setCartItens(storage);
  }, [setCartItens]);

  // toda vez q a lista for modificada reatribui o valor total do carrinho
  useEffect(() => {
    setCartValue(totalValue());
  }, [cartItens, setCartValue, totalValue]);

  return (
    <div id={ `${id}` }>
      <div data-testid={ `${id - 1}-product-qtd-input` }>{quantity}</div>
      <div data-testid={ `${id - 1}-product-name` }>{name}</div>
      <div data-testid={ `${id - 1}-product-unit-price` }>{finalPrice}</div>
      <div data-testid={ `${id - 1}-product-total-value` }>{valorTotal}</div>
      <button
        type="button"
        data-testid={ `${id - 1}-removal-button` }
        onClick={ () => handleClick(id, cartItens, setCartItens) }
      >
        X
      </button>
    </div>
  );
}
