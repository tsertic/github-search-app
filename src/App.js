import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
//components
import Navbar from './components/layout/Navbar';
import About from './pages/About';
import User from './components/users/User';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:login" component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
