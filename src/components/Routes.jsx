import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Order from './Order';
import Status from './Status';

export default function Routes() {
  return (
    <div className="p-sm-4 p-lg-5 mb-5 content">
      <Switch>
        <Route
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <Route
          path="/new-order"
          component={Order}
        />
        <Route
          path="/status"
          component={Status}
        />
        <Redirect to="/dashboard" />
      </Switch>      
    </div>
  );
}
