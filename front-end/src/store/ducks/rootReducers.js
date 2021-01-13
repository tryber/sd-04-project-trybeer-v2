import { combineReducers } from 'redux';

import userReducer from './user';
import sideBarHideReducer from './sideBarHide';
import cartReducer from './productsCart';
import productsReducer from './products';
import ordersReducer from './orders';
import salesReducer from './sales';
import salesProductsReducer from './salesProducts';

const rootReducer = combineReducers({
  userReducer,
  sideBarHideReducer,
  cartReducer,
  productsReducer,
  ordersReducer,
  salesReducer,
  salesProductsReducer,
});

export default rootReducer;
