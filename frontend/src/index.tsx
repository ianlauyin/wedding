/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { Invitation } from "./pages/Invitation";
import { Internal } from "./pages/Internal";
import { ErrorPage } from "./pages/ErrorPage";
import { ErrorModalProvider } from "@context/ErrorModal";
import { InvitationLayout } from "@components/InvitationLayout";
import "./index.css";
import { Table } from "@pages/Internal/Backoffice/GuestList/Table";
import { GuestInfoView } from "wedding-interface";

const dummyGuestList: GuestInfoView[] = [
  {
    id: "1",
    side: "BRIDE",
    name: "John Doe",
    relationship: "Friend",
    estimatedCount: 1,
    confirmedCount: 1,
    createdBy: "John Doe",
    createdAt: "2021-01-01",
    updatedBy: "John Doe",
    updatedAt: "2021-01-01",
  },
];

const App = () => (
  <ErrorModalProvider>
    <Router>
      <Route path="/invitation/:id" component={Invitation} />
      <Route path="/internal" component={Internal} />
      <Route
        path="/"
        component={() => (
          <Table list={dummyGuestList} refetch={() => {}} setModal={() => {}} />
        )}
      />
      <Route
        path="**"
        component={() => <ErrorPage message="Page Not Found" />}
      />
    </Router>
  </ErrorModalProvider>
);

render(App, document.getElementById("root")!);
