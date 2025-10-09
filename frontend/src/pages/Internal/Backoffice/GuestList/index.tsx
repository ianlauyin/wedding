import { GuestInfoView } from "wedding-interface";
import { Infomations } from "./Infomations";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Table } from "./Table";
import { getGuestList } from "@ajax/service";
import { CreateModal } from "./CreateModal";
import { Loading } from "@components/Loading";
import { ActionPanel } from "./ActionPanel";
import { UpdateModal } from "./UpdateModal";

export const GuestList = () => {
  const [res, { refetch }] = createResource(getGuestList);
  const [modal, setModal] = createSignal<GuestInfoView | true | null>(null);

  return (
    <div class="flex flex-col items-center space-y-4 my-4">
      <Show when={res()}>
        {(data) => (
          <>
            <Infomations list={data().guestList} />
            <ActionPanel
              onAddButtonClick={() => setModal(true)}
              refetch={refetch}
            />
          </>
        )}
      </Show>
      <Show when={modal()}>
        {(data) => {
          const modalInfo = data();
          if (modalInfo === true)
            return (
              <CreateModal refetch={refetch} onClose={() => setModal(null)} />
            );
          else
            return (
              <UpdateModal
                guest={modalInfo}
                refetch={refetch}
                onClose={() => setModal(null)}
              />
            );
        }}
      </Show>
      <Switch>
        <Match when={res.loading}>
          <Loading class="mt-4" />
        </Match>
        <Match when={res.error}>
          <p class="text-red-500 mt-4">
            Error Loading Guest List: {res.error.message}
          </p>
        </Match>
        <Match when={res()}>
          {(data) => (
            <Table
              list={data().guestList}
              refetch={refetch}
              openEditModal={setModal}
            />
          )}
        </Match>
      </Switch>
    </div>
  );
};
