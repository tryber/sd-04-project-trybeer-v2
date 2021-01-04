import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AppContext } from '../context/AppContext';
import './ProductCard.css';

function ProductCard({ index, id, name, price, urlImage, quantity }) {
  const [product, setProduct] = useState({ id, name, price, urlImage, quantity });
  const { cart, setCart, setTotal } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const sum = cart.reduce((acc, p) => {
      return acc + (p.price * p.quantity);
    }, 0);
    setTotal(sum);
  }, [cart, product]);

  function verifyProduct(prod, op) {
    const isThereAProduct = cart.find(item => item.id === prod.id);

    if (!isThereAProduct) {
      op === '+' ?
        setCart([...cart, { ...prod, quantity: prod.quantity + 1, status: 'Pendente' }]) :
        setCart([...cart, { ...prod, quantity: prod.quantity - 1, status: 'Pendente' }])
    } else {
      const i = cart.indexOf(isThereAProduct);
      op === '+' ?
        isThereAProduct.quantity += 1 :
        isThereAProduct.quantity -= 1;
    }
  };

  function addToCart(prod, op) {
    if (op === 'minus' && prod.quantity === 0) return;

    if (op === 'plus') {
      setProduct({ ...prod, quantity: prod.quantity + 1 });
      verifyProduct(prod, '+');
    } else {
      setProduct({ ...prod, quantity: prod.quantity - 1 });
      verifyProduct(prod, '-');

      const findProd = cart.findIndex(item => item.id === prod.id && item.quantity === 0);
      const newCart = cart.filter(item => item.quantity !== 0);
      setCart(newCart);
    }
  };

  return (
    <div className='beer-card'>
      <img data-testid={`${index}-product-img`} className="beerImg" src={urlImage} alt="imagem" />
      <p data-testid={`${index}-product-name`}>{product.name}</p>
      <span data-testid={`${index}-product-price`}>{`R$ ${product.price.toFixed(2).toString().replace('.', ',')}`}</span>
      <div className="bottom">
        <button data-testid={`${index}-product-minus`} onClick={() => addToCart(product, 'minus')}>-</button>
        <span data-testid={`${index}-product-qtd`}>{product.quantity}</span>
        <button data-testid={`${index}-product-plus`} onClick={() => addToCart(product, 'plus')}>+</button>
      </div>
    </div>
  )
};

export default ProductCard;
