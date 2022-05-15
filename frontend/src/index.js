import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import Home from "./pages/Home";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Episode from "./pages/Episode";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/episode" exact element={<Episode />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
