import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  REMOVE_CART,
} from '../actions';

const initialState = JSON.parse(localStorage.getItem('cart')) || {};

export default (state = initialState, { type, payload }) => {
  let cartList = { ...state };

  switch (type) {
    case UPDATE_QUANTITY:
      cartList[payload.name].quantity += payload.number;
      break;

    case REMOVE_FROM_CART:
      delete cartList[payload.name];
      break;

    case ADD_TO_CART:
      cartList[payload.name] = { ...payload, quantity: payload.number };
      break;

    case REMOVE_CART:
      cartList = {};
      break;

    default:
      break;
  }
  localStorage.setItem('cart', JSON.stringify(cartList));
  return cartList;
};
