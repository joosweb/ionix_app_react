import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth';

import Login from './pages/Login';
import Clients from './pages/Dashboard';
import Logout from './pages/Logout';
import UserProfile from './pages/UserProfile';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/clients" component={Clients} />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute patch="/clients/:id" component={UserProfile} />
        </Switch>
    </Router>
);

export default Routes;
