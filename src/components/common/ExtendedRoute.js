import React from 'react';
import { Route } from 'react-router-dom';

const ExtendedRoute = ({ component: Component, routeProps, ...rest }) => (
    <Route {...rest} render={props => (<Component {...props} {...routeProps}/>) }/>
);

export default ExtendedRoute;
