import UserService from '../../services/trybeerAPI';

/** sideBarHide REDUX */

/** Actions Types */

export const Types = {
  ADD_PRODUCTS: 'ADD_PRODUCTS',
};

/** Reducers */

const initialState = {
  productsDB: {},
  productsFetching: false,
};

const productsReducer = (state = initialState, { type, products }) => {
  switch (type) {
    case Types.ADD_PRODUCTS:
      return {
        ...state,
        productsDB: products,
        productsFetching: true,
      };
    default:
      return state;
  }
};

/** Actions */

export const addProducts = (products) => ({
  type: Types.ADD_PRODUCTS,
  products,
});

export const hasErrored = (error) => ({
  type: Types.ERROR,
  payload: error,
});

/** Actions Creators */

export const getProducts = () => (dispatch) => {
  UserService.getProducts()
    .then((res) => {
      dispatch(addProducts(res.data));
    })
    .catch((error) => dispatch(hasErrored(error)));
};

export default productsReducer;
