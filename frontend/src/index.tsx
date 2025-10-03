/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { Invitation } from "./pages/Invitation";
import { Internal } from "./pages/Internal";
import { ErrorPage } from "./pages/ErrorPage";
import { Backoffice } from "@pages/Internal/Backoffice";
import { ErrorModalProvider } from "@context/ErrorModal";
import { InvitationLayout } from "@components/InvitationLayout";
import "./index.css";

const App = () => (
  <ErrorModalProvider>
    <Router>
      <Route path="/invitation/:id" component={Invitation} />
      <Route path="/internal" component={Internal} />
      <Route path="/" component={() => <InvitationLayout />} />
      <Route
        path="**"
        component={() => <ErrorPage message="Page Not Found" />}
      />
    </Router>
  </ErrorModalProvider>
);

render(App, document.getElementById("root")!);
