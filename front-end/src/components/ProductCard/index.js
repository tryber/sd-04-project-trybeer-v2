import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../context';

// funcao verifica se tem itens no storage, se n tiver ele adiciona
function addStorage(id, name, price, urlImage, quantity) {
  const storage = JSON.parse(localStorage.cartItens);
  const additem = {
    id,
    name,
    price,
    urlImage,
    quantity,
  };
  storage.push(additem);
  localStorage.cartItens = JSON.stringify(storage);
}

// funcao para tirar itens do storage caso a quantidade seja 0
function subStorage(id) {
  const storage = JSON.parse(localStorage.cartItens);
  const newStorage = storage.filter((ele) => ele.id !== id);
  localStorage.cartItens = JSON.stringify(newStorage);
}

// funcao para atualizar quantidade do item no storage
function updateStorage(id, quantity) {
  const storage = JSON.parse(localStorage.cartItens);
  const newArray = storage.map((ele) => {
    if (ele.id === id) {
      ele.quantity = quantity;
      return ele;
    }
    return ele;
  });
  localStorage.cartItens = JSON.stringify(newArray);
}

function subButton(quantity, zero, setQuantity) {
  return quantity !== zero ? setQuantity(quantity - 1) : null;
}

// funcao que checa se tem item no storage e atualiza a quantidade
function checkStorage(id, zero, setQuantity) {
  const storage = localStorage.cartItens ? JSON.parse(localStorage.cartItens) : null;
  if (storage.length > zero) {
    storage.forEach((e) => {
      if (e.id === id) setQuantity(e.quantity);
      return null;
    });
  }
  return null;
}

export default function ProductCard(data) {
  const { setCartValue, totalValue } = useContext(ProductContext);
  const zero = 0;
  // variavel para formatacao do price
  // const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  const {
    id, name, price, urlImage,
  } = data.data;

  const [quantity, setQuantity] = useState(zero);

  // roda quando o card eh montado, checa localstorage
  // checa se o item do card ja esta no localstorage e atribui a quantidade
  useEffect(() => {
    checkStorage(id, zero, setQuantity);
  }, [id]);

  // roda toda vez que o valor do "quantity" for alterado
  // checa se o item ja esta no localstorage, se tiver atualiza a quantidade,
  // se nao tiver adiciona o item
  useEffect(() => {
    // pega localStorage
    const storage = JSON.parse(localStorage.cartItens);
    // checa se o item ja esta no storage
    const newArray = storage.find((ele) => ele.id === id);
    // se o item n estiver no storage add
    if (!newArray) addStorage(id, name, price, urlImage, quantity);
    // se a quantidade for 0 tira do storage
    if (quantity === zero) subStorage(id);
    // atualiza o array
    storage.forEach((e) => {
      if (e.id === id) {
        updateStorage(id, quantity);
      }
    });
    setCartValue(totalValue());
  }, [id, name, price, quantity, setCartValue, totalValue, urlImage]);

  return (
    <div>
      <div data-testid={ `${id - 1}-product-price` }>{price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</div>
      <div>
        <img width="100px" data-testid={ `${id - 1}-product-img` } src={ urlImage } alt="url da imagem" />
        <div data-testid={ `${id - 1}-product-name` }>{name}</div>
      </div>
      <div>
        <button
          type="button"
          // disabled={ quantity === zero }
          data-testid={ `${id - 1}-product-minus` }
          onClick={ () => subButton(quantity, zero, setQuantity) }
        >
          -
        </button>
        <div data-testid={ `${id - 1}-product-qtd` }>{quantity}</div>
        <button
          type="button"
          // disabled={ { quantity } === prodQuantity }
          data-testid={ `${id - 1}-product-plus` }
          onClick={ () => setQuantity(quantity + 1) }
        >
          +
        </button>
      </div>
    </div>
  );
}
