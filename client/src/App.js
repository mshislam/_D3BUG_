import React from "react";
import "./App.css";
import HomePage from "./components/pages/Home";
import { Route, BrowserRouter as Router } from "react-router-dom";

import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/home" component={HomePage} />
        </Router>
      </div>
    );
  }
}

export default App;
