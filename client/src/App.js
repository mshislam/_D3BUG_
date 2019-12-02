import React from "react";
import "./App.css";
import HomePage from "./components/pages/Home";
import { Route, BrowserRouter as Router } from "react-router-dom";
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
