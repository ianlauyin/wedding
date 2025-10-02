import { createSignal } from "solid-js";
import { LoginResponse } from "wedding-interface";
import { login } from "@ajax/service";
import { AjaxError } from "@ajax/error";

export interface Props {
  onLoginSuccess: (data: LoginResponse) => void;
}

export const Login = ({ onLoginSuccess }: Props) => {
  const [name, setName] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");

  const handleLogin = async () => {
    try {
      const loginInfo = await login({ name: name(), password: password() });
      onLoginSuccess(loginInfo);
    } catch (error) {
      setErrorMessage(
        error instanceof AjaxError ? error.message : "Login failed"
      );
    }
  };

  return (
    <div>
      <h4>Admin Login Page</h4>
      <input
        placeholder="Name"
        value={name()}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Password"
        type={showPassword() ? "text" : "password"}
        value={password()}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        Show Password
        <input
          type="checkbox"
          checked={showPassword()}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
      </label>
      <button
        disabled={name() === "" || password() === ""}
        onClick={handleLogin}
      >
        Login
      </button>
      <p class="text-red-500">{errorMessage()}</p>
    </div>
  );
};
