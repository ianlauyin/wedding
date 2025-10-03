import { GetGuestListResponse, GuestInfoView } from "wedding-interface";
import { Infomations } from "./Infomations";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Table } from "./Table";
import { getGuestList } from "@ajax/service";
import { EditModal } from "./EditModal";

export const GuestList = () => {
  const [list, { refetch }] = createResource(getDummyGuestList);
  const [editModal, setEditModal] = createSignal<GuestInfoView | true | null>(
    null
  );

  const content = (data: Array<GuestInfoView>) => {
    return (
      <>
        <Infomations list={data} onAddGuest={() => setEditModal(true)} />
        <Table list={data} />
        <Show when={editModal()}>
          {(data) => <EditModal guest={data()} refreshList={refetch} />}
        </Show>
      </>
    );
  };

  return (
    <div class="flex flex-col items-center">
      <Switch>
        <Match when={list.loading}>
          <div class="loading mt-4" />
        </Match>
        <Match when={list.error}>
          <p class="text-red-500 mt-4">
            Error Loading Guest List: {list.error.message}
          </p>
        </Match>
        <Match when={list()}>{(data) => content(data().guestList)}</Match>
      </Switch>
    </div>
  );
};

const getDummyGuestList = async (): Promise<GetGuestListResponse> => {
  const now = new Date().toISOString();
  return {
    guestList: [
      {
        id: "2",
        name: "Michael Chen",
        relationship: "Best Friend",
        estimatedCount: 1,
        confirmedCount: null,
        side: "GROOM",
        createdBy: "Daniel",
        createdAt: now,
        updatedBy: "Daniel",
        updatedAt: now,
      },
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
      {
        id: "2",
        name: "Michael Chen",
        relationship: "Best Friend",
        estimatedCount: 1,
        confirmedCount: null,
        side: "GROOM",
        createdBy: "Daniel",
        createdAt: now,
        updatedBy: "Daniel",
        updatedAt: now,
      },
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
    ],
  };
};
