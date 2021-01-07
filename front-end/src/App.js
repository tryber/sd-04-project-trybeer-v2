import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import AdminProfile from './pages/AdminProfile';
import AdminOrders from './pages/AdminOrders';
import AdminOrdersDetails from './pages/AdminOrdersDetails';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register" component={ RegisterPage } />
        <Route exact path="/products" component={ ProductsPage } />
        <Route exact path="/orders" component={ OrdersPage } />
        <Route exact path="/profile" component={ ProfilePage } />
        <Route exact path="/checkout" component={ CheckoutPage } />
        <Route exact path="/orders/:id" component={ OrderDetails } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/admin/orders/:id" component={ AdminOrdersDetails } />
      </Switch>
    </Router>
  );
}

export default App;
