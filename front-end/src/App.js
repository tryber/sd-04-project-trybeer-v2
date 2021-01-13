import React from 'react';
import jwtDecode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadFromLocalStorage } from './services/localStorage';
import Login from './pages/Login/Login';
import { login } from './store/ducks/user';
import Register from './pages/Register/Register';
import Products from './pages/Products/Products';
import Checkout from './pages/Checkout/Checkout';
import ClientOrders from './pages/ClientOrders/ClientOrders';
import ClientProfile from './pages/ClientProfile/ClientProfile';
import './App.css';
import AdminProfile from './pages/AdminProfile';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail/index';
import OrderDetailAdmin from './pages/OrderDetailAdmin/index';
import ChatClient from './pages/ChatCliente/index';
import ChatAdmin from './pages/ChatAdmin/index';

function App() {
  const dispatch = useDispatch();

  const numDivisionDate = 1000; // eslint remote

  const requireAuth = () => {
    const userData = loadFromLocalStorage('user');

    if (userData != null) {
      const decoded = jwtDecode(userData.token);
      const now = Date.now().valueOf() / numDivisionDate; // inspiration from web Stackflow
      if (typeof decoded.exp !== 'undefined' && decoded.exp > now) {
        const user = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        };
        dispatch(login({ token: userData.token, data: user }));
        return true;
      }
    }
    return false;
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route
          path="/orders/:id"
          render={ (props) => (requireAuth() ? (
            <OrderDetail dataFromOrders={ props } />
          ) : (
            <Redirect to="/login" />
          )) }
        />
        <Route
          exact
          path="/orders"
          render={ () => (requireAuth() ? <ClientOrders /> : <Redirect to="/login" />) }
        />
        <Route
          exact
          path="/chat"
          render={ () => (requireAuth() ? <ChatClient /> : <Redirect to="/login" />) }
        />
        <Route
          exact
          path="/admin/chats"
          render={ () => (requireAuth() ? <ChatAdmin /> : <Redirect to="/login" />) }
        />
        <Route
          exact
          path="/products"
          render={ () => (requireAuth() ? <Products /> : <Redirect to="/login" />) }
        />
        <Route
          exact
          path="/checkout"
          render={ () => (requireAuth() ? <Checkout /> : <Redirect to="/login" />) }
        />
        <Route
          exact
          path="/profile"
          render={ () => (requireAuth() ? <ClientProfile /> : <Redirect to="/login" />) }
        />
        <Route
          path="/admin/orders/:id"
          render={ (matchProps) => (requireAuth() ? (
            <OrderDetailAdmin dataFromOrders={ matchProps } />
          ) : (
            <Redirect to="/login" />
          )) }
        />
        <Route
          exact
          path="/admin/orders"
          render={ () => (requireAuth() ? <Orders /> : <Redirect to="/login" />) }
        />
        <Route
          exact
          path="/admin/profile"
          render={ () => (requireAuth() ? <AdminProfile /> : <Redirect to="/login" />) }
        />
      </Switch>
    </Router>
  );
}

export default App;
