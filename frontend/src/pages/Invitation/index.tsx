import { useParams } from "@solidjs/router";
import { createResource, Match, Show, Switch } from "solid-js";
import { getInvitationInfo } from "../../ajax";
import { Loading } from "../../component/Loading";
import { InvitationLayout } from "../../component/InvitationLayout";
import "./index.css";
import { NotFound } from "../../component/NotFound";

export const Invitation = () => {
  const [info] = createResource(useParams().id, getInvitationInfo);

  return (
    <div id="invitation-page">
      <Switch fallback={<NotFound />}>
        <Match when={info.loading}>
          <Loading />
        </Match>
        <Match when={info.error}>
          <div>Error: {info.error.message}</div>
        </Match>
        <Match when={info()}>
          <InvitationLayout info={info} />
        </Match>
      </Switch>
    </div>
  );
};
