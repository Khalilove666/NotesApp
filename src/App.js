import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './components/Auth.js';
import {Welcome, Register, Login, Dashboard} from './screens';


const  App = () => {
  return (
      <AuthProvider>
        <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
        </div>
      </AuthProvider>
  );
}

export default App;
