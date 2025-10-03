/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { Invitation } from "./pages/Invitation";
import { Internal } from "./pages/Internal";
import { ErrorPage } from "./pages/ErrorPage";
import { Backoffice } from "@pages/Internal/Backoffice";
import "./index.css";

const App = () => (
  <Router>
    <Route path="/invitation/:id?" component={Invitation} />
    <Route path="/internal" component={Internal} />
    {/* <Route path="/" component={() => <Invitation />} /> */}
    <Route
      path="/"
      component={() => (
        <Backoffice
          name="Ian"
          loginTime={new Date().toISOString()}
          onLogout={() => {}}
        />
      )}
    />
    <Route path="**" component={() => <ErrorPage message="Page Not Found" />} />
  </Router>
);

render(App, document.getElementById("root")!);
