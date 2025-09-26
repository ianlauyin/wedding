/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { Invitation } from "./pages/Invitation";
import { Internal } from "./pages/Internal";
import { ErrorComponent } from "./component/ErrorComponent";
import "./index.css";
import { InvitationLayout } from "./component/InvitationLayout";
import { Backoffice } from "@pages/Internal/Backoffice";

const App = () => (
  <Router>
    <Route path="/invitation/:id" component={Invitation} />
    <Route path="/internal" component={Internal} />
    {/* <Route path="/" component={() => <InvitationLayout />} /> */}
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
    <Route
      path="**"
      component={() => <ErrorComponent message="Page Not Found" />}
    />
  </Router>
);

render(App, document.getElementById("root")!);
