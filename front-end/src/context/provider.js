import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBeertContext from './appBeerContext';
import apiProducts from '../services/productApi';

const Provider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem('user');

    apiProducts.getProducts().then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });

    if (!user) history.push('/login');
    if (localStorage.getItem('cart')) {
      const data = localStorage.getItem('cart');
      setCart(JSON.parse(data));
    }
  }, [history]);

  const contextValue = {
    products,
    setProducts,
    cart,
    setCart,
    isloading,
    setIsLoading,
  };

  return <AppBeertContext.Provider value={ contextValue }>{ children }</AppBeertContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
