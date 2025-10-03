import { GuestInfoView } from "wedding-interface";
import { Infomations } from "./Infomations";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Table } from "./Table";
import { getGuestList } from "@ajax/service";
import { EditModal } from "./EditModal";

export const GuestList = () => {
  const [list, { refetch }] = createResource(getGuestList);
  const [editModal, setEditModal] = createSignal<GuestInfoView | true | null>(
    null
  );

  const content = (data: Array<GuestInfoView>) => {
    return (
      <>
        <Infomations list={data} onAddGuest={() => setEditModal(true)} />
        <Table list={data} refetch={refetch} />
        <Show when={editModal()}>
          {(data) => (
            <EditModal
              guest={data()}
              refetch={refetch}
              onClose={() => setEditModal(null)}
            />
          )}
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
