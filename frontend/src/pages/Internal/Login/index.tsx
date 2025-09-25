import { createSignal } from "solid-js";
import { LoginRequest, LoginResponse } from "wedding-interface";
import { login } from "../../../ajax";
import { AjaxError } from "../../../ajax/error";
import "./index.css";

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
    <div id="login-page">
      <h1>Admin Login Page</h1>
      <label>
        Name
        <input
          type="text"
          value={name()}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type={showPassword() ? "text" : "password"}
          value={password()}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Show Password
        <input
          type="checkbox"
          checked={showPassword()}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
      <p class="error-message">{errorMessage()}</p>
    </div>
  );
};
