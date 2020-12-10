export const INC_QUANTITY = 'INC_QUANTITY';
export const DEC_QUANTITY = 'DEC_QUANTITY';
export const SAVE_CART = 'SAVE_CART';
export const UPDATE_TOTAL_CHECKOUT = 'UPDATE_TOTAL_CHECKOUT';
export const UPDATE_CART = 'UPDATE_CART';

export const incQuantity = (payload) => ({
  type: INC_QUANTITY,
  payload,
});

export const decQuantity = (payload) => ({
  type: DEC_QUANTITY,
  payload,
});

export const saveCart = (localstorage, total) => ({
  type: SAVE_CART,
  localstorage,
  total,
});

export const updateTotalCheckout = (payload) => ({
  type: UPDATE_TOTAL_CHECKOUT,
  payload,
});

export const updateCart = (payload) => ({
  type: UPDATE_CART,
  payload,
});
