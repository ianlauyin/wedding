import { useParams } from "@solidjs/router";
import { createResource, Match, Switch } from "solid-js";
import { getInvitationInfo } from "@ajax/service";
import { ErrorPage } from "@pages/ErrorPage";
import { Loading } from "@components/Loading";
import { Layout } from "./Layout";

const fetchInvitationInfo = async (id?: string) => {
  if (!id) return null;
  return await getInvitationInfo(id);
};

export const Invitation = () => {
  const id = useParams().id;
  const [info] = createResource(id, fetchInvitationInfo);

  return (
    <Switch fallback={<Layout />}>
      <Match when={info.loading}>
        <Loading />
      </Match>
      <Match when={info.error}>
        <ErrorPage message={info.error.message} />
      </Match>
      <Match when={info()}>{(data) => <Layout guestInfo={data()} />}</Match>
    </Switch>
  );
};
