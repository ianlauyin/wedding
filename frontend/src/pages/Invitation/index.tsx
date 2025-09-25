import { useParams } from "@solidjs/router";
import { createResource, Match, Switch } from "solid-js";
import { getInvitationInfo } from "@ajax/service";
import { Loading } from "@components/Loading";
import { InvitationLayout } from "@components/InvitationLayout";
import { ErrorComponent } from "@components/ErrorComponent";

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
        <ErrorComponent message={info.error.message} />
      </Match>
    </Switch>
  );
};
