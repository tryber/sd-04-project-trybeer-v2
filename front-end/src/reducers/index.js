import { combineReducers } from 'redux';

import cartReducer from './reducer';

const rootReducer = combineReducers({
  cartReducer,
});

export default rootReducer;
