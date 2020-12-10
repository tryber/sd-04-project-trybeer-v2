import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ClientProfile from './pages/ClientProfile';
import Checkout from './pages/Checkout';
import ClientOrders from './pages/ClientOrders';
import OrderDetails from './pages/OrderDetails';
import AdminProfile from './pages/AdminProfile';
import AdminOrders from './pages/AdminOrders';
import AdminOrdersDetails from './pages/AdminOrdersDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/register" component={ Register } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/profile" component={ ClientProfile } />
      <Route exact path="/admin/profile" component={ AdminProfile } />
      <Route exact path="/admin/orders" component={ AdminOrders } />
      <Route exact path="/checkout" component={ Checkout } />
      <Route exact path="/orders" component={ ClientOrders } />
      <Route exact path="/orders/:id" component={ OrderDetails } />
      <Route exact path="/admin/orders/:id" component={ AdminOrdersDetails } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
