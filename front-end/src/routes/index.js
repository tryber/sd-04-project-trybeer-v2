import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Chat, Checkout, Login, NotFound, Orders, OrdersDetails, Products, Profile, Register,
} from '../pages';
import { ProductProvider } from '../context';
import theme from '../theme';

const Routes = () => (
  <BrowserRouter>
    <ProductProvider>
      <ChakraProvider theme={ theme }>
        <Switch>
          <Login exact path="/" />
          <Checkout path="/checkout" />
          <Login path="/login" />
          <Orders exact path="/orders" />
          <Route path="/orders/:id">
            <OrdersDetails />
          </Route>
          <Orders exact path="/admin/orders" />
          <Route path="/admin/orders/:id">
            <OrdersDetails />
          </Route>
          <Profile path="/admin/profile" />
          <Products path="/products" />
          <Profile path="/profile" />
          <Register path="/register" />
          <Chat exact path="/chat" />
          <Chat exact path="/admin/chats" />
          <Route component={ NotFound } />
        </Switch>
      </ChakraProvider>
    </ProductProvider>
  </BrowserRouter>
);

export default Routes;
