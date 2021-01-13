import UserService from '../../services/trybeerAPI';

/** sideBarHide REDUX */

/** Actions Types */

export const Types = {
  GET_SALES_PRODUCTS: 'GET_SALES_PRODUCTS',
  ERROR_SALES_PRODUCTS: 'ERROR_SALES_PRODUCTS',
};

/** Reducers */

const initialState = {
  getSalesProductsSuccess: false,
  errors: [],
  salesProducts: [],
};

const salesProductsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GET_SALES_PRODUCTS:
      return {
        ...state,
        salesProducts: payload,
        getSalesProductsSuccess: true,
      };
    case Types.ERROR_SALES_PRODUCTS:
      return {
        ...state,
        errors: [
          ...state.errors,
          `${payload.error.code} mess: ${payload.error.message}`,
        ],
      };

    default:
      return state;
  }
};

/** Actions */

export const addSalesProducts = (payload) => ({
  type: Types.GET_SALES_PRODUCTS,
  payload,
});

export const hasErrored = (error) => ({
  type: Types.ERROR_SALES_PRODUCTS,
  payload: error,
});

/** Actions Creators */

export const getSalesProducts = (token, id) => (dispatch) => {
  UserService.getSalesProducts(token, id)
    .then((res) => dispatch(addSalesProducts(res.data)))
    .catch((error) => dispatch(hasErrored(error)));
};

export default salesProductsReducer;
