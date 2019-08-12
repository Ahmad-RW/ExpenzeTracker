import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import urls from './router/urls'
import Home from './components/Home'
import UserActions from './components/UserActions'
import NotFound from './components/NotFound.js'
import Navbar from './components/Navbar'
import Category from './components/Category'
import Settings from './components/Settings'
import {getUserData} from './store/actions'
import {connect} from 'react-redux'
import LandingPage from './components/LandingPage';
import Register from './components/account/Register';
import Login from './components/account/Login';
import Logout from './components/account/Logout';
import { stat } from 'fs';

class App extends Component {
  constructor(props){
    
    super(props)
  console.log(this.props)
    const payload ={
      email : "dummy@dummy.com"
    }
    this.props.getUserData(payload)
  }
  render() {
    return (

      <BrowserRouter>
       
        <Switch>
          <Route exact path={urls.landingPage} component = {LandingPage} />
          <Route exact path={urls.register} component = {Register} />
          <Route exact path={urls.login} component={Login} />
          <Route exact path={urls.logout} component={Logout}/>
          <Navbar />
          <Route exact path={urls.home} component={Home} />
          <Route exact path={urls.userActions} component={UserActions} />
          <Route exact path={urls.category} component={Category} />
          <Route exact path={urls.settings} component={Settings} />
          <Route  component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state =>{
  return{
    userData : state.userData
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    getUserData : (payload) => {dispatch(getUserData(payload))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

//some documentation:
// switch tag will iterate over the routes until it finds a match to url. if it finds a match it'll load the component
// urls matching is not exact by default it'll load the first route that matches it even if partially. e.g. if you go to http://localhost:3000/home/userActions/fwef it'll still load UserActions component because it partially matched it
