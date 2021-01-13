/** SALES REDUX */

import SalesService from '../../services/salesService';

/** Actions Types */

export const Types = {
  SALES_FETCHED: 'SALES_FETCHED',
  SALES_FETCHING: 'SALES_FETCHING',
  ERROR: 'ERROR',
};

/** Reducers */

const initialState = {
  isFetching: false,
  fetchSalesSuccess: false,
  sales: {
    pending: [],
    processed: [],
    delivered: [],
  },
};

const salesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SALES_FETCHING:
      return { ...state, isFetching: payload.status };
    case Types.SALES_FETCHED:
      return {
        ...state,
        sales: {
          fetchSalesSuccess: true,
          pending: [
            ...payload.sales.filter((sale) => sale.status === 'Pendente'),
          ],
          processed: [
            ...payload.sales.filter((sale) => sale.status === 'Preparando'),
          ],
          delivered: [
            ...payload.sales.filter((sale) => sale.status === 'Entregue'),
          ],
        },
      };
    case Types.ERROR:
      return { ...state, errors: payload.error };
    default:
      return state;
  }
};

/** Actions */
export const salesFetching = (status) => ({
  type: Types.SALES_FETCHING,
  payload: {
    status,
  },
});

export const salesFetched = (sales) => ({
  type: Types.SALES_FETCHED,
  payload: {
    sales,
  },
});

export const hasErrored = (error = []) => ({
  type: Types.ERROR,
  payload: error,
});

/** Actions Creators */

const twoHundred = 200;

export const getSales = (authToken) => (dispatch) => {
  dispatch(salesFetching(true));

  SalesService.getSales(authToken)
    .then((response) => {
      if (response.status === twoHundred) {
        dispatch(salesFetched(response.data));
        dispatch(salesFetching(false));
      }
    })
    .catch((error) => dispatch(hasErrored(error)));
};

export default salesReducer;
