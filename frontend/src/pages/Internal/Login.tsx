import { createSignal } from "solid-js";
import { LoginResponse } from "wedding-interface";
import { login } from "@ajax/service";
import { AjaxError } from "@ajax/error";
import { Input } from "@components/Input";

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
    } catch (error) {
      setErrorMessage(
        error instanceof AjaxError ? error.message : "Login failed"
      );
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
        <button
          class="btn btn-accent"
          disabled={name() === "" || password() === ""}
          onClick={handleLogin}
        >
          Login
        </button>
        <p class="text-red-500">{errorMessage()}</p>
      </div>
    </div>
  );
};
