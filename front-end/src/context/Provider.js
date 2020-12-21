import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext();

const Provider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const states = {
    cart,
    setCart,
  };

  return <Context.Provider value={ states }>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Provider;
