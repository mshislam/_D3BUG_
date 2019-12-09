
import React from "react";

import ReactDOM from "react-dom";

import App from "./App.js";

import * as serviceWorker from "./serviceWorker";

import "tachyons";
import "./index.css";

import store from "./ConfigureStore";

import { Provider } from "react-redux";

import "react-widgets/dist/css/react-widgets.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
