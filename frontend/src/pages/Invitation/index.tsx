import { useParams } from "@solidjs/router";
import { createResource, Match, Switch } from "solid-js";
import { getInvitationInfo } from "@ajax/service";
import { InvitationLayout } from "@components/InvitationLayout";
import { ErrorPage } from "@pages/ErrorPage";
import { CircularProgress } from "@suid/material";

export const Invitation = () => {
  const [info] = createResource(useParams().id, getInvitationInfo);

  return (
    <Switch>
      <Match when={info()}>
        {(data) => <InvitationLayout name={data().name} />}
      </Match>
      <Match when={info.loading}>
        <CircularProgress />
      </Match>
      <Match when={info.error}>
        <ErrorPage message={info.error.message} />
      </Match>
    </Switch>
  );
};
