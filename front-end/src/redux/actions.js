export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const REMOVE_CART = 'REMOVE_CART';

export const updateQuantity = (payload) => ({
  type: UPDATE_QUANTITY,
  payload,
});

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});

export const removeAllCart = () => ({
  type: REMOVE_CART,
});
