import { GuestInfoView } from "wedding-interface";
import { Infomations } from "./Infomations";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Table } from "./Table";
import { getGuestList } from "@ajax/service";
import { CreateModal } from "./Modal/CreateModal";
import { Loading } from "@components/Loading";
import { ActionPanel } from "./ActionPanel";
import { UpdateModal } from "./Modal/UpdateModal";
import { ModalInfo } from "./Modal/type";
import { DeleteModal } from "./Modal/DeleteModal";

export const GuestList = () => {
  const [res, { refetch }] = createResource(getGuestList);
  const [modal, setModal] = createSignal<ModalInfo | null>(null);

  return (
    <div class="flex flex-col items-center space-y-4 my-4">
      <Show when={res()}>
        {(data) => (
          <>
            <Infomations list={data().guestList} />
            <ActionPanel
              onAddButtonClick={() => setModal({ type: "create" })}
              refetch={refetch}
            />
          </>
        )}
      </Show>
      <Show when={modal()}>
        {(data) => {
          const modalInfo = data();
          switch (modalInfo.type) {
            case "create":
              return (
                <CreateModal refetch={refetch} onClose={() => setModal(null)} />
              );
            case "delete":
              return (
                <DeleteModal
                  guest={modalInfo.guest}
                  refetch={refetch}
                  onClose={() => setModal(null)}
                />
              );
            case "update":
              return (
                <UpdateModal
                  guest={modalInfo.guest}
                  refetch={refetch}
                  onClose={() => setModal(null)}
                />
              );
          }
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
              setModal={setModal}
            />
          )}
        </Match>
      </Switch>
    </div>
  );
};
