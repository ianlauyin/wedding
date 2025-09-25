import { useParams } from "@solidjs/router";
import { createResource, Match, Show, Switch } from "solid-js";
import { getInvitationInfo } from "../../ajax";
import { Loading } from "../../component/Loading";
import { InvitationLayout } from "../../component/InvitationLayout";
import "./index.css";
import { ErrorComponent } from "../../component/ErrorComponent";

export const Invitation = () => {
  const [info] = createResource(useParams().id, getInvitationInfo);

  return (
    <Switch>
      <Match when={info.loading}>
        <Loading />
      </Match>
      <Match when={info.error}>
        <ErrorComponent message={info.error.message} />
      </Match>
      <Match when={info()}>
        <InvitationLayout info={info} />
      </Match>
    </Switch>
  );
};
