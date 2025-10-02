import { useParams } from "@solidjs/router";
import { createResource, Match, Switch } from "solid-js";
import { getInvitationInfo } from "@ajax/service";
import { InvitationLayout } from "@components/InvitationLayout";
import { ErrorPage } from "@pages/ErrorPage";
import { Loading } from "@components/Loading";
import { InvitationInfoResponse } from "wedding-interface";

export const Invitation = () => {
  const [info] = createResource(useParams().id, getInvitationInfo);

  return (
    <Switch>
      <Match when={info.loading}>
        <Loading />
      </Match>
      <Match when={info.error}>
        <ErrorPage message={info.error.message} />
      </Match>
      <Match when={info()}>
        {(data) => <InvitationLayout name={data().name} />}
      </Match>
    </Switch>
  );
};
