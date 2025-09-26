import { createResource, Match, Switch } from "solid-js";
import { getLoginRecord } from "@ajax/service";
import { Loading } from "@components/Loading";
import { Login } from "./Login";
import { Backoffice } from "./Backoffice";
import { LoginResponse } from "wedding-interface";

const fetchLoginRecord = async (): Promise<LoginResponse | null> => {
  try {
    return await getLoginRecord();
  } catch (error) {
    return null;
  }
};

export const Internal = () => {
  const [loginRecord, { mutate }] = createResource<LoginResponse | null>(
    fetchLoginRecord
  );

  return (
    <Switch fallback={<Login onLoginSuccess={mutate} />}>
      <Match when={loginRecord()}>
        {(data) => <Backoffice {...data()} onLogout={() => mutate(null)} />}
      </Match>
      <Match when={loginRecord.loading}>
        <Loading />
      </Match>
    </Switch>
  );
};
