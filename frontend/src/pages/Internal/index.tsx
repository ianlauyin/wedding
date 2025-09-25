import { createResource, Match, Switch } from "solid-js";
import { getLoginRecord } from "../../ajax";
import { Login } from "./Login";
import { Loading } from "../../component/Loading";
import { Backoffice } from "./Backoffice";

export const Internal = () => {
  const [loginRecord, { mutate }] = createResource(null, getLoginRecord);

  return (
    <Switch fallback={<Login onLoginSuccess={mutate} />}>
      <Match when={loginRecord.loading}>
        <Loading />
      </Match>
      <Match when={loginRecord()}>
        {(data) => (
          <Backoffice name={data().name} loginTime={data().loginTime} />
        )}
      </Match>
    </Switch>
  );
};
