import { GuestInfoView } from "wedding-interface";
import { Infomations } from "./Infomations";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Table } from "./Table";
import { getGuestList } from "@ajax/service";
import { EditModal } from "./EditModal";
import { Loading } from "@components/Loading";
import { ActionPanel } from "./ActionPanel";

export const GuestList = () => {
  const [res, { refetch }] = createResource(getGuestList);
  const [editModal, setEditModal] = createSignal<GuestInfoView | true | null>(
    null
  );

  return (
    <div class="flex flex-col items-center space-y-4 my-4">
      <Show when={res()}>
        {(data) => (
          <>
            <Infomations list={data().guestList} />
            <ActionPanel
              onAddGuest={() => setEditModal(true)}
              refetch={refetch}
            />
          </>
        )}
      </Show>
      <Show when={editModal()}>
        {(data) => (
          <EditModal
            guest={data()}
            refetch={refetch}
            onClose={() => setEditModal(null)}
          />
        )}
      </Show>
      <Switch>
        <Match when={res.loading && !res()}>
          <Loading class="mt-4" />
        </Match>
        <Match when={res.error}>
          <p class="text-red-500 mt-4">
            Error Loading Guest List: {res.error.message}
          </p>
        </Match>
        <Match when={res()}>
          {(data) => <Table list={data().guestList} refetch={refetch} />}
        </Match>
      </Switch>
    </div>
  );
};
