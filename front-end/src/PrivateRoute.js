import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import isAuth from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    path={ rest.path }
    render={ ({ match }) => (isAuth() ? <Component match={ match } /> : <Redirect to="/login" />) }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
