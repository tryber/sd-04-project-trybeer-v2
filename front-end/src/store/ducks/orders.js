import UserService from '../../services/trybeerAPI';

/** sideBarHide REDUX */

/** Actions Types */

export const Types = {
  POST_ORDER: 'POST_ORDER',
  ERROR_ORDER: 'ERROR_ORDER',
  GET_ORDER: 'GET_ORDER',
};

/** Reducers */

const initialState = {
  postOrderSuccess: false,
  getOrderSuccess: false,
  orders: [],
  errors: [],
};

const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.POST_ORDER:
      return {
        ...state,
        postOrderSuccess: true,
      };
    case Types.GET_ORDER:
      return {
        ...state,
        orders: payload,
        getOrderSuccess: true,
      };
    case Types.ERROR_ORDER:
      return {
        ...state,
        errors: [
          ...state.errors,
          `${payload.error} mess: ${payload.error}`,
        ],
      };

    default:
      return state;
  }
};

/** Actions */

export const sendOrder = (payload) => ({
  type: Types.POST_ORDER,
  payload,
});

export const receivedOrder = (payload) => ({
  type: Types.GET_ORDER,
  payload,
});

export const hasErrored = (error) => ({
  type: Types.ERROR_ORDER,
  payload: error,
});

/** Actions Creators */

export const postOrder = (cart, id, email, total, address, number, token) => (
  dispatch,
) => {
  const cartArray = [];
  Object.keys(cart).map((key) => cartArray
    .push({
      productId: key,
      quantity: cart[key].quantity,
    }));

  const payload = {
    id,
    email,
    total: total.toString(),
    address,
    number,
    products: cartArray,
  };
  UserService.postOrder(payload, token)
    .then((res) => dispatch(sendOrder(res)))
    .catch((error) => dispatch(hasErrored(error)));
};

const twoHundred = 200;

export const getOrders = (token) => (dispatch) => {
  UserService.getOrders(token)
    .then((response) => {
      /** Verifica se o recurso foi criado no BD e procede */
      /** Faz login se ok */
      if (response.status === twoHundred) {
        dispatch(receivedOrder(response.data));
      }
    })
    .catch((error) => dispatch(hasErrored(error)));
};

export default ordersReducer;
