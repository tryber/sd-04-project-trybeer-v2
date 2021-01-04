import React, { useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import TopBar from '../components/ClientBar.jsx';
import api from '../services/api';
import '../App.css';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { isPropertySignature } from 'typescript';

function Products() {
  const {
    products,
    setProducts,
    setCart,
    total,
    setTotal,
    orderMessage,
  } = useContext(AppContext);
  const history = useHistory();
  let val;
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    
    setTimeout(() => {
      val = 0;
      api
        .get('/products', { headers: { Authorization: token } })
        .then((response) => setProducts(response.data))
        .catch(() => history.push('/login'));
  
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }
      val = 1;
    }, 1000);
  }, []);


  return (
    <div>
      <TopBar title={'TryBeer'} isAdm={false} />
      <h3>{orderMessage}</h3>
      <div className="ver-carrinho">
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <button
            data-testid="checkout-bottom-btn"
            onClick={() => <Redirect to="/checkout" />}
            disabled={total === 0}
          >
            <i class="fas fa-shopping-cart"></i>
            <span data-testid="checkout-bottom-btn-value" className="btn-value">
              {(total || total === 0) &&
                `R$ ${total.toFixed(2).toLocaleString().replace('.', ',')}`}
            </span>
          </button>
        </Link>
      </div>
      {val === 0 ? <div className="loading">Carregando...</div> : <div></div>}
      <div className="products">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            index={index}
            id={product.id}
            name={product.name}
            price={product.price}
            urlImage={product.urlImage}
            quantity={0}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
