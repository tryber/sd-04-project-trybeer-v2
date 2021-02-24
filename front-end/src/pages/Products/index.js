import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import ProductsCard from '../../components/ProductsCard';
import Rodape from '../../components/Rodape';

import api from '../../services/api';

import './styles.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  const addQuantity = (cart) => {
    const cartWithQuantity = [...cart];
    cartWithQuantity.forEach((item) => {
      item.quantity = 0;
      return item;
    });
    return cartWithQuantity;
  };

  useEffect(() => {
    const configureStorage = async () => {
      const response = await api.get('/products');
      const cartUpdated = addQuantity(response.data);
      setProducts([...cartUpdated]);
      localStorage.setItem('products', JSON.stringify(response.data));
    };
    const productList = JSON.parse(localStorage.getItem('products'));
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
          id, name, price, url_image: urlImage, quantity,
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
