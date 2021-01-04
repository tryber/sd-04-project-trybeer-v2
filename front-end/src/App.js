import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import OrderDetail from './pages/OrderDetail';
import {
  UserProfile,
  FormPage,
  Products,
  Checkout,
  AdminOrders,
  AdminOrderDetails,
  AdminProfile,
  Orders,
} from './pages';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <FormPage>
          <LoginForm />
        </FormPage>
      </Route>
      <Route path="/profile">
        <UserProfile />
      </Route>
      <Route path="/orders/:id">
        <OrderDetail />
      </Route>
      <Route path="/register">
        <FormPage>
          <RegisterForm />
        </FormPage>
      </Route>
      <Route path="/orders">
        <Orders />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/admin/orders/:id">
        <AdminOrderDetails />
      </Route>
      <Route path="/admin/orders">
        <AdminOrders />
      </Route>
      <Route path="/admin/profile">
        <AdminProfile />
      </Route>
    </Switch>
  );
}

export default App;
