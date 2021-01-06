import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context';

import './styles.css';

const ProductsCard = ({
  id, testid, name, price, img, qtd, setProducts,
}) => {
  const VALOR_ZERO = 0;
  const CASAS_DECIMAIS = 2;
  const { totalCarrinho, seTotalCarrinho } = useContext(Context);

  const setProductList = (productList) => {
    localStorage.setItem('products', JSON.stringify(productList));
    setProducts([...productList]);
  };

  const decrementValue = () => {
    const productList = JSON.parse(localStorage.getItem('products'));
    const indice = productList.findIndex((item) => item.id === id);
    if (productList[indice].quantity > VALOR_ZERO) {
      productList[indice].quantity -= 1;
      seTotalCarrinho(() => totalCarrinho - price);
      localStorage.setItem('totalCarrinho', (totalCarrinho - price).toFixed(CASAS_DECIMAIS));
    }
    setProductList(productList);
  };

  const incrementValue = () => {
    const productList = JSON.parse(localStorage.getItem('products'));
    const indice = productList.findIndex((item) => item.id === id);
    productList[indice].quantity += 1;
    seTotalCarrinho(() => totalCarrinho + price);
    localStorage.setItem('totalCarrinho', (totalCarrinho + price).toFixed(CASAS_DECIMAIS));
    setProductList(productList);
  };

  return (
    <div className="card-body" id={ id }>
      <span data-testid={ `${testid}-product-price` }>
        { price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
      </span>
      <img src={ img } alt="Aqui vai uma imagem" data-testid={ `${testid}-product-img` } />
      <span className="product-title" data-testid={ `${testid}-product-name` }>{ name }</span>
      <div className="product-card-panel">
        <button onClick={ decrementValue } type="button" data-testid={ `${testid}-product-minus` } className="sum-button">-</button>
        <span data-testid={ `${testid}-product-qtd` }>{qtd}</span>
        <button onClick={ incrementValue } type="button" data-testid={ `${testid}-product-plus` } className="sum-button">+</button>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  testid: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  qtd: PropTypes.number.isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default ProductsCard;
