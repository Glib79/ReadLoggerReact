import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SecuredRoute from './SecuredRoute';

import NotFound from '../components/support/NotFound';

import LoginForm from '../components/public/LoginForm';
import RegisterForm from '../components/public/RegisterForm';
import Welcome from '../components/public/Welcome';

import AddBookHandler from '../components/private/AddBookHandler';
import Dashboard from '../components/private/Dashboard';

const Routes = () => { 
  return (
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />

      <SecuredRoute path='/add-book' component={AddBookHandler} />
      <SecuredRoute path='/dashboard' component={Dashboard} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;