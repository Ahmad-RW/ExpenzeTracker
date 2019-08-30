import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import urls from './router/urls'
import Home from './components/Home'
import NotFound from './components/NotFound.js'
import Category from './components/Category'
import Settings from './components/Settings'
import { getUserData } from './store/actions'
import { connect } from 'react-redux'
import LandingPage from './components/LandingPage';
import Register from './components/account/Register';
import Login from './components/account/Login';
import requireAuth from './components/account/RequireAuthHOC';
import EmailConfirmed from './components/account/EmailConfirmed'
import Notifications from 'react-notify-toast'
class App extends Component {
  // constructor(props){
  //   super(props)
  //   if(this.props.auth){

  //   }
  // }
  render() {
    return (
      <BrowserRouter>
      
      <Notifications options={{zIndex:600, top:"180px"}} />
        <Switch>
          <Route exact path={urls.landingPage} component={LandingPage} />
          <Route exact path={urls.register} component={Register} />
          <Route exact path={urls.login} component={Login} />
          <Route exact path={urls.home} component={requireAuth(Home)} />
          <Route exact path={urls.category} component={requireAuth(Category)} />
          <Route exact path={urls.settings} component={requireAuth(Settings)} />
          <Route exact path="/account/emailConfirmed" component={EmailConfirmed} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserData: (payload) => { dispatch(getUserData(payload)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

//some documentation:
// switch tag will iterate over the routes until it finds a match to url. if it finds a match it'll load the component
// urls matching is not exact by default it'll load the first route that matches it even if partially. e.g. if you go to http://localhost:3000/home/userActions/fwef it'll still load UserActions component because it partially matched it
