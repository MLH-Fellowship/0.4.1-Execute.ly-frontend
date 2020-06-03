import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import LandingPage from '../modules/Landing';
import UploadPage from '../modules/Editor/UploadPage';
import EditorPage from '../modules/Editor/EditorPage';

export default function Routes() {
  return (
    <Router history={history}>
      <Route path="/" exact component={LandingPage} />
      <Route path="/upload" exact component={UploadPage} />
      <Route path="/editor" exact component={EditorPage} />
    </Router>
  );
}
