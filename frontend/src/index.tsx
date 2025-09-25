/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { Invitation } from "./pages/Invitation";
import { Internal } from "./pages/Internal";
import { NotFound } from "./component/NotFound";

const App = () => (
  <Router>
    <Route path="/invitation/:id" component={Invitation} />
    <Route path="/internal" component={Internal} />
    <Route path="**" component={NotFound} />
  </Router>
);

render(App, document.getElementById("root")!);
