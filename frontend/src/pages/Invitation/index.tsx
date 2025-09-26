import { useParams } from "@solidjs/router";
import { createResource, Match, Switch } from "solid-js";
import { getInvitationInfo } from "@ajax/service";
import { Loading } from "@components/Loading";
import { InvitationLayout } from "@components/InvitationLayout";
import { ErrorPage } from "@pages/ErrorPage";

export const Invitation = () => {
  const [info] = createResource(useParams().id, getInvitationInfo);

  return (
    <Switch>
      <Match when={info()}>
        {(data) => <InvitationLayout name={data().name} />}
      </Match>
      <Match when={info.loading}>
        <Loading />
      </Match>
      <Match when={info.error}>
        <ErrorPage message={info.error.message} />
      </Match>
    </Switch>
  );
};
