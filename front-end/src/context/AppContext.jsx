import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';

const AppContext = createContext();

const list = [
  { product: 'caipirinha', qty: 4, value: 10.0 },
  { product: 'heineken', qty: 10, value: 15.0 },
  { product: 'Conhaque', qty: 2, value: 12.5 },
  { product: 'Hennesey', qty: 2, value: 50.0 },
];

const AppProvider = ({ children }) => {
  const [orderList, setOrderList] = useState(list);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderMessage, setOrderMessage] = useState('');

  const context = {
    email,
    setEmail,
    userName,
    setUserName,
    orderList,
    setOrderList,
    products,
    setProducts,
    cart,
    setCart,
    total,
    setTotal,
    orderMessage,
    setOrderMessage,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

//Prop-types

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
