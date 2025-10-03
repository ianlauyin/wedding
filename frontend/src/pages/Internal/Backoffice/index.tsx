import { FutureFeatureList } from "./FutureFeatureList";
import { Header, type Props as HeaderProps } from "./Header";
import { GuestList } from "./GuestList";
import { GuestInfoView } from "wedding-interface";
import { createResource, Match, Switch } from "solid-js";

interface Props extends HeaderProps {}

export const Backoffice = (props: Props) => {
  const [list] = createResource<Array<GuestInfoView>>(getDummyGuestList);

  const guestListSwitch = (
    <Switch>
      <Match when={list.loading}>
        <div class="loading" />
      </Match>
      {/* <Match when={list.error}>
        <p class="text-red-500">
          Error Loading Guest List: {list.error.message}
        </p>
      </Match> */}
      <Match when={list()}>{(data) => <GuestList list={data()} />}</Match>
    </Switch>
  );

  return (
    <div>
      <Header
        loginTime={props.loginTime}
        name={props.name}
        onLogout={props.onLogout}
      />
      <div style={{ padding: "2px" }}>
        {guestListSwitch}
        <FutureFeatureList />
      </div>
    </div>
  );
};

const getDummyGuestList = async (): Promise<Array<GuestInfoView>> => {
  throw new Error("Not implemented");
  const now = new Date().toISOString();
  return [
    {
      id: "1",
      name: "Emily Johnson",
      relationship: "Sister",
      estimatedCount: 2,
      confirmedCount: 2,
      side: "BRIDE",
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
      side: "GROOM",
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
      side: "BRIDE",
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
      side: "GROOM",
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
      side: "BRIDE",
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
      side: "GROOM",
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
      side: "BRIDE",
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
      side: "GROOM",
      createdBy: "Wedding Planner Emma",
      createdAt: now,
      updatedBy: "Daniel",
      updatedAt: now,
    },
  ];
};
