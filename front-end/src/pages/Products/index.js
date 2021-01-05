import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import ProductsCard from '../../components/ProductsCard';
import Rodape from '../../components/Rodape';

import api from '../../services/api';

import './styles.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  const configureStorage = async () => {
    const response = await api.get('/products');
    setProducts([...response.data]);
    localStorage.setItem('products', JSON.stringify(response.data));
  };

  useEffect(() => {
    const productList = JSON.parse(localStorage.getItem('products'));
    // console.log(productList);
    const fetchProducts = async () => {
      if (productList && productList.length) {
        setProducts([...productList]);
      } else {
        configureStorage();
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <Header title="TryBeer" />
      <div className="product-cards-container">
        { products.map(({
          id, name, price, urlImage, quantity,
        }, index) => (
          <ProductsCard
            key={ id }
            id={ id }
            testid={ index }
            name={ name }
            price={ price }
            img={ urlImage }
            qtd={ quantity }
            setProducts={ setProducts }
          />
        )) }
      </div>
      <Rodape />
    </div>
  );
};

export default Products;
