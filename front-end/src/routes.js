import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Produtcs from './pages/Products';
import MyOrdereds from './pages/MyOrdereds';
import { Provider } from './context';
import Register from './pages/Register/index';
import ClientProfile from './pages/ClientProfile';
import AdminProfile from './pages/AdminProfile';
import LoginPage from './pages/LoginPage';
import ProductDetails from './pages/ProductDetails';
import MyOrdersADM from './pages/MyOrdersADM';
import PrivateRoute from './PrivateRoute';
import Checkout from './pages/CheckoutPage';
import ProductDetailsADM from './pages/ProductDetailsADM';

const Routes = () => (
  <Provider>
    <Switch>
      <Route path="/" exact component={ LoginPage } />
      <Route path="/login" exact component={ LoginPage } />
      <Route path="/register" exact component={ Register } />
      <PrivateRoute path="/products" exact component={ Produtcs } />
      <PrivateRoute path="/profile" exact component={ ClientProfile } />
      <PrivateRoute path="/orders" exact component={ MyOrdereds } />
      <PrivateRoute path="/orders/:orderNumber" exact component={ ProductDetails } />
      <Route path="/admin/orders" exact component={ MyOrdersADM } />
      <PrivateRoute path="/admin/orders/:orderNumber" exact component={ ProductDetailsADM } />
      <PrivateRoute path="/checkout" exact component={ Checkout } />
      <PrivateRoute path="/admin/profile" exact component={ AdminProfile } />
    </Switch>
  </Provider>
);

export default Routes;
