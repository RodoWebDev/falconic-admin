import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'pages/login';
import Logout from 'pages/logout';
import LandingPages from 'pages/LandingPages';
import Register from 'pages/register';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' render={ () => <Redirect to='/login' /> }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/register' component={ Register }/>
      {/* <Route exact path='/forgot-password' component={ ForgotPassword }/> */}
      <Route render={ () => <Redirect to='/login' /> }/>
    </Switch>
  )
}

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ LandingPages }/>
      <Route exact path='/login' render={ () => <Redirect to='/' /> }/>
      <Route exact path='/Register' render={ () => <Redirect to='/' /> }/>
      <Route exact path='/logout' component={ Logout }/>
      {/* <Route component={ NotFound }/> */}
    </Switch>
  )
}
