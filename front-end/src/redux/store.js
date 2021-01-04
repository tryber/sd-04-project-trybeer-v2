import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
