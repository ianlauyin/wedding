import { createResource, Match, Switch } from "solid-js";
import { getLoginRecord } from "@ajax/service";
import { Login } from "./Login";
import { Backoffice } from "./Backoffice";
import { LoginResponse } from "wedding-interface";
import { CircularProgress } from "@suid/material";

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
        <CircularProgress />
      </Match>
    </Switch>
  );
};
