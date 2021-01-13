import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MenuClient from '../../components/MenuClient';

import ProductCard from '../../components/ProductCard';
import { listProducts } from '../../api';
import { ProductContext } from '../../context';

function Products() {
  const { cartValue } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const storage = localStorage.cartItens ? JSON.parse(localStorage.cartItens) : null;
  const zero = 0;

  useEffect(() => {
    if (!localStorage.user) history.push('/login');
    if (!localStorage.cartItens) localStorage.cartItens = JSON.stringify([]);
    listProducts().then((response) => {
      // ('response', response.data);

      // const { id, name, price, urlImage: url_image } = response.data ;
      const novo = response.data;
      const teste = novo.map((e) => {
        e.urlImage = e.url_image;
        delete e.url_image;
        return e;
      });
      // console.log('novooo', teste);
      // setProducts(response.data);
      setProducts(teste);
    })
      .catch(() => 'um erro ocorreu');
  }, [history]);

  return (
    <div>
      <MenuClient header="TryBeer" />
      {products ? products.map((e) => <ProductCard data={ e } key={ e.id } />) : <p>loading</p>}
      <Link to="/checkout">
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          disabled={ storage ? storage.length <= zero : false }
        >
          Ver Carrinho
        </button>
      </Link>
      <span data-testid="checkout-bottom-btn-value">{cartValue}</span>
    </div>
  );
}
export default Products;

// logica
// receber a list de produtos
// renderizar um card p/ cada produto
// botao ver carrinho fixo e com valor da compra
// criar localstorage pra itens
