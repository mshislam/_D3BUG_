import React from 'react';
import SignIn from './components/pages/SignIn'

import { connect } from "react-redux";

import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import Profile from './components/pages/Profile'


import Home from "./components/pages/Home"
import setAuthorizationToken from './utils.js/setAuthorizationToken';
import SignUp from './components/pages/SignUp';

//import A234 from './components/pages/Projects/conneed'
//gowaha sign in w de hat7awelny 3ala app.js
// sign up w de hat7awelny 3ala form


function mapStateToProps(state) {
  console.log(state.authentication.loggedUser)
  
  const { isLoggedIn,loggedUser } = state.authentication;
 const {users} = state.users
  return { isLoggedIn,loggedUser,users };
}

class App extends React.Component {
  
    
  
  
  
  
  
  render(){
    console.log(this.props.isLoggedIn==false)
      setAuthorizationToken()
   
        return(
           <div>
            

     <Router>

      <Switch>
      <Route  exact path="/" component={SignIn}/>
      
      <Route  exact path="/SignUp" component={SignUp}/>
          <Route  exact path="/home" component={Home}/>
       
          <Route   exact path="/Profile/:id" component={Profile}/>
        
         
          </Switch>
          </Router>

      </div>

        )
      
    
    
    
   
  
   
  
    
  }
  }


export default connect(mapStateToProps)(App);
