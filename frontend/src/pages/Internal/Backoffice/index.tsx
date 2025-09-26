import { FutureFeatureList } from "./FutureFeatureList";
import { Header, type Props as HeaderProps } from "./Header";
import "./index.css";
import { GuestList } from "./GuestList";
import { GuestInfoView } from "wedding-interface";
import { createResource, Match, Switch } from "solid-js";
import { Loading } from "@components/Loading";

interface Props extends HeaderProps {}

export const Backoffice = ({ name, loginTime, onLogout }: Props) => {
  const [list] = createResource<Array<GuestInfoView>>(getDummyGuestList);

  const guestListSwitch = (
    <Switch>
      <Match when={list.loading}>
        <Loading />
      </Match>
      <Match when={list.error}>
        <h2 class="error-message">
          Error Loading Guest List: {list.error.message}
        </h2>
      </Match>
      <Match when={list()}>{(data) => <GuestList list={data()} />}</Match>
    </Switch>
  );

  return (
    <div id="backoffice">
      <Header loginTime={loginTime} name={name} onLogout={onLogout} />
      {guestListSwitch}
      <FutureFeatureList />
    </div>
  );
};

const getDummyGuestList = async (): Promise<Array<GuestInfoView>> => {
  const now = new Date().toISOString();
  return [
    {
      id: "1",
      name: "Emily Johnson",
      relationship: "Sister",
      estimatedCount: 2,
      confirmedCount: 2,
      side: "bride",
      createdBy: "Alexandra",
      createdAt: now,
      updatedBy: "Alexandra",
      updatedAt: now,
    },
    {
      id: "2",
      name: "Michael Chen",
      relationship: "Best Friend",
      estimatedCount: 1,
      confirmedCount: 1,
      side: "groom",
      createdBy: "Daniel",
      createdAt: now,
      updatedBy: "Daniel",
      updatedAt: now,
    },
    {
      id: "3",
      name: "Sarah Williams",
      relationship: "College Friend",
      estimatedCount: 2,
      confirmedCount: 0,
      side: "bride",
      createdBy: "Alexandra",
      createdAt: now,
      updatedBy: "Wedding Planner Emma",
      updatedAt: now,
    },
    {
      id: "4",
      name: "David Rodriguez",
      relationship: "Coworker",
      estimatedCount: 1,
      confirmedCount: 1,
      side: "groom",
      createdBy: "Daniel",
      createdAt: now,
      updatedBy: "Daniel",
      updatedAt: now,
    },
    {
      id: "5",
      name: "The Thompson Family",
      relationship: "Family Friends",
      estimatedCount: 4,
      confirmedCount: 3,
      side: "bride",
      createdBy: "Wedding Planner Emma",
      createdAt: now,
      updatedBy: "Alexandra",
      updatedAt: now,
    },
    {
      id: "6",
      name: "Robert Martinez",
      relationship: "Brother",
      estimatedCount: 3,
      confirmedCount: 2,
      side: "groom",
      createdBy: "Daniel",
      createdAt: now,
      updatedBy: "Wedding Planner Emma",
      updatedAt: now,
    },
    {
      id: "7",
      name: "Lisa Park",
      relationship: "Childhood Friend",
      estimatedCount: 1,
      confirmedCount: 0,
      side: "bride",
      createdBy: "Alexandra",
      createdAt: now,
      updatedBy: "Alexandra",
      updatedAt: now,
    },
    {
      id: "8",
      name: "James Wilson",
      relationship: "Cousin",
      estimatedCount: 2,
      confirmedCount: 1,
      side: "groom",
      createdBy: "Wedding Planner Emma",
      createdAt: now,
      updatedBy: "Daniel",
      updatedAt: now,
    },
  ];
};
