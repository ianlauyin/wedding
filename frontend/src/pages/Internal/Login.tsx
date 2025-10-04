import { createSignal } from "solid-js";
import { LoginResponse } from "wedding-interface";
import { login } from "@ajax/service";
import { Input } from "@components/Input";
import Button from "@components/Button";

export interface Props {
  onLoginSuccess: (data: LoginResponse) => void;
}

export const Login = (props: Props) => {
  const [name, setName] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");

  const handleLogin = async () => {
    try {
      const loginInfo = await login({ name: name(), password: password() });
      props.onLoginSuccess(loginInfo);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div class="hero justify-self-center w-96">
      <div class="hero-content flex-col">
        <h1 class="text-4xl font-bold">Admin Login Page</h1>
        <div class="space-y-4">
          <Input label="Name" value={name()} setValue={setName} />
          <Input
            label="Password"
            value={password()}
            setValue={setPassword}
            type={showPassword() ? "text" : "password"}
          />
          <label class="w-full label justify-end">
            <input
              type="checkbox"
              class="checkbox"
              checked={showPassword()}
              onClick={() => setShowPassword(!showPassword())}
            />
            Show Password
          </label>
        </div>
        <Button
          class="w-20"
          color="primary"
          disabled={name() === "" || password() === ""}
          onClick={handleLogin}
        >
          Login
        </Button>
        <p class="text-red-500">{errorMessage()}</p>
      </div>
    </div>
  );
};
