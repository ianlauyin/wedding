/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { Invitation } from "./pages/Invitation";
import { Internal } from "./pages/Internal";
import { ErrorPage } from "./pages/ErrorPage";
import "./index.css";
import { Backoffice } from "@pages/Internal/Backoffice";
import { InvitationLayout } from "@components/InvitationLayout";

const App = () => (
  <Router>
    <Route path="/invitation/:id" component={Invitation} />
    <Route path="/internal" component={Internal} />
    {/* <Route path="/" component={() => <InvitationLayout />} /> */}
    <Route
      path="/"
      component={() => (
        <Backoffice
          loginTime={Date.now().toString()}
          name={"Ian3000"}
          onLogout={() => {}}
        />
      )}
    />
    <Route path="**" component={() => <ErrorPage message="Page Not Found" />} />
  </Router>
);

render(App, document.getElementById("root")!);
