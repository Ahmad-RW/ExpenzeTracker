import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import urls from './router/urls'
import Home from './components/Home'
import UserActions from './components/UserActions'
import NotFound from './components/NotFound.js';
import Navbar from './components/Navbar';
import Catagory from './components/Catagory'
class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path={urls.home} component={Home} />
          <Route exact path={urls.userActions} component={UserActions} />
          <Route exact path={urls.catagory} component={Catagory} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;

//some documentation:
// switch tag will iterate over the routes until it finds a match to url. if it finds a match it'll load the component
// urls matching is not exact by default it'll load the first route that matches it even if partially. e.g. if you go to http://localhost:3000/home/userActions/fwef it'll still load UserActions component because it partially matched it
