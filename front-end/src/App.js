import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'rbx/index.css';
import { Container } from 'rbx';

import Provider from './context/provider';
import Login from './Pages/login';
// import Admin from './Pages/adminOrders';
// import AdminProfile from './Pages/adminProfile';
import Registro from './Pages/registro';
import Products from './Pages/products';
// import Profile from './Pages/clientProfile';
// import Checkout from './Pages/checkoutPage';
// import ClientOrders from './Pages/clientOrders';
// import OrdersDetails from './Pages/ordersDetail';

// import './App.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  return (
    <Container>
      <Provider>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Registro } />
          <Route path="/products" component={ Products } />
          {/* <Route path="/profile" component={ Profile } />
          <Route path="/admin/orders" component={ Admin } />
          <Route exact path="/admin/profile" component={ AdminProfile } />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/orders/:id" component={ OrdersDetails } />
          <Route path="/orders" component={ ClientOrders } /> */}
        </Switch>
      </Provider>
    </Container>
  );
}

export default App;
