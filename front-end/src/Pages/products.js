import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import TopMenu from '../Components/Menu/TopMenu';
// import ShopCart from '../Components/shopcart';
import BeerContext from '../context/appBeerContext';

import './styleClientPage.css';

const Client = () => {
  const [cartUpdate, setCartUpdate] = useState(true);
  const [valorTotal, setValorTotal] = useState();
  const { products, isloading } = useContext(BeerContext);
  const DOIS = 2;
  const ZERO = 0;

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart && Object.values(cart);
    const all = newCart && newCart.reduce((acc, curr) => curr.quantidade * curr.price + acc, ZERO);
    setValorTotal(all);
  }, [cartUpdate]);

  if (isloading) return <div>Loading ...</div>;

  return (
    <div>
      {/* <TopMenu title="TryBeer" /> */}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3">
          {products.map((product, index) => (
            <div key={ product.id } className="col mb-4">
              <div key={ product.id }>
                <img
                  src={ product.url_image }
                  data-testid={ `${index}-product-img` }
                  className="card-img-top img-thumbnail border-success"
                  style={ { width: 400, height: 350 } }
                  alt="foto do produto"
                />
                <div className="card-body">
                  <h4 className="card-title" data-testid={ `${index}-product-name` }>
                    {product.name}
                  </h4>
                  <h4 className="card-title" data-testid={ `${index}-product-price` }>
                    {`R$ ${product.price.toFixed(DOIS).replace('.', ',')}`}
                  </h4>
                </div>
                <div className="card-footer border-success">
                  {/* <ShopCart
                    product={ product }
                    setCartUpdate={ setCartUpdate }
                    cartUpdate={ cartUpdate }
                    index={ index }
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer>
          <button type="button" disabled={ !valorTotal } data-testid="checkout-bottom-btn">
            <Link to="/checkout">
              <span data-testid="checkout-bottom-btn-value">
                {`Ver Carrinho R$ ${
                  valorTotal
                    ? valorTotal.toFixed(DOIS).replace('.', ',')
                    : ZERO.toFixed(DOIS).replace('.', ',')
                }`}
              </span>
            </Link>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Client;
