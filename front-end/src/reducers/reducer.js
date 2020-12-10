import {
  INC_QUANTITY,
  DEC_QUANTITY,
  UPDATE_TOTAL_CHECKOUT,
  UPDATE_CART,
  SAVE_CART,
} from '../actions/index';

const INITIAL_STATE = {
  cart: [],
  total: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INC_QUANTITY: {
      const product = state.cart.find(
        (item) => item.name === action.payload.name,
      );

      if (product) {
        product.quantity += 1;
        return {
          ...state,
          cart: [...state.cart],
          total: state.total + product.price,
        };
      }
      action.payload.quantity = 1;
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price,
      };
    }

    case DEC_QUANTITY: {
      const product = state.cart.find(
        (item) => item.name === action.payload.name,
      );
      if (product && product.quantity === 1) {
        return {
          ...state,
          cart: [
            ...state.cart.filter((item) => item.name !== action.payload.name),
          ],
          total: state.total - product.price,
        };
      }

      action.payload.quantity -= 1;
      return {
        ...state,
        cart: [...state.cart],
      };
    }
    case SAVE_CART:
      return {
        ...state,
        cart: [...action.localstorage],
        total: action.total,
      };

    case UPDATE_TOTAL_CHECKOUT: {
      return {
        ...state,
        total: state.total.toFixed(1) - action.payload.toFixed(1),
      };
    }

    case UPDATE_CART: {
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.name !== action.payload.name),
        ],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
