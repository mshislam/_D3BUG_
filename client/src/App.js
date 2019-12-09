import React from "react";
import SignIn from "./components/pages/SignIn";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import setAuthorizationToken from "./utils.js/setAuthorizationToken";
import SignUp from "./components/pages/SignUp";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

function mapStateToProps(state) {
  console.log(state.authentication.loggedUser);

  const { isLoggedIn, loggedUser } = state.authentication;
  const { users } = state.users;
  return { isLoggedIn, loggedUser, users };
}

class App extends React.Component {
  render() {
    console.log(this.props.isLoggedIn == false);
    setAuthorizationToken();
    if (this.props.isLoggedIn == false)
      return (
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={SignIn} />

              <Route exact path="/SignUp" component={SignUp} />
            </Switch>
          </Router>
        </div>
      );
    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
