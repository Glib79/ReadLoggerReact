import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SecuredRoute from './SecuredRoute';

import NotFound from '../components/support/NotFound';

import Confirm from '../components/public/Confirm';
import LoginForm from '../components/public/LoginForm';
import RegisterForm from '../components/public/RegisterForm';
import Welcome from '../components/public/Welcome';

import AddBookHandler from '../components/private/AddBookHandler';
import Dashboard from '../components/private/Dashboard';
import NotConfirmed from '../components/private/NotConfirmed';

const Routes = () => { 
  return (
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/email-confirm/:hash' component={Confirm} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />

      <SecuredRoute path='/add-book' component={AddBookHandler} />
      <SecuredRoute path='/dashboard' component={Dashboard} />
      <SecuredRoute path='/not-confirmed' component={NotConfirmed} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;