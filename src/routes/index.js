import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import LandingPage from '../modules/Landing';
import EditorPage from '../modules/Editor';

export default function Routes() {
  return (
    <Router history={history}>
      <Route path="/" exact component={LandingPage} />
      <Route path="/editor" exact component={EditorPage} />
    </Router>
  );
}
