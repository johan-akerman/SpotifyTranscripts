import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App.js";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
