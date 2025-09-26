import { createResource } from "solid-js";
import { FutureFeatureList } from "./FutureFeatureList";
import { Header, type Props as HeaderProps } from "./Header";
import { GuestInfoView } from "wedding-interface";
import "./index.css";
import { GuestList } from "./GuestList";

interface Props extends HeaderProps {}

export const Backoffice = ({ name, loginTime, onLogout }: Props) => {
  const [guestList] = createResource<Array<GuestInfoView>>(getDummyGuestList);

  return (
    <div id="backoffice">
      <Header loginTime={loginTime} name={name} onLogout={onLogout} />
      <GuestList list={guestList() ?? []} />
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
