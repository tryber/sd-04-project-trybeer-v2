import React, { useEffect, useContext, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import TopBar from '../components/ClientBar';
import api from '../services/api';
import '../App.css';

const zero = 0;
const dois = 2;
const mil = 1000;

function Products() {
  const [val, setVal] = useState('');
  const {
    products, setProducts, setCart, total, orderMessage,
  } = useContext(AppContext);
  const history = useHistory();

  const tempinho = (funcao) => {
    funcao();
  };

  useEffect(() => {
    const meuQueridoTempo = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      api
        .get('/products', { headers: { Authorization: token } })
        .then((response) => setProducts(response.data))
        .catch(() => history.push('/login'));

      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }
    };
    setTimeout(async () => {
      setVal(zero);
      await tempinho(meuQueridoTempo);
      setVal(1);
    }, mil);
  }, []);

  return (
    <div>
      <TopBar title="TryBeer" isAdm={ false } />
      <h3>{orderMessage}</h3>
      <div className="ver-carrinho">
        <Link to="/checkout" style={ { textDecoration: 'none' } }>
          <button
            type="button"
            data-testid="checkout-bottom-btn"
            onClick={ () => <Redirect to="/checkout" /> }
            disabled={ total === zero }
          >
            <i className="fas fa-shopping-cart" />
            <span data-testid="checkout-bottom-btn-value" className="btn-value">
              {(total || total === zero)
                && `R$ ${total.toFixed(dois).toLocaleString().replace('.', ',')}`}
            </span>
          </button>
        </Link>
      </div>
      {val === zero ? <div className="loading">Carregando...</div> : <div />}
      <div className="products">
        {products.map((product, index) => (
          <ProductCard
            key={ product.name }
            index={ index }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            urlImage={ product.urlImage }
            quantity={ 0 }
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
