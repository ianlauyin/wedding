import { createSignal } from "solid-js";
import { LoginResponse } from "wedding-interface";
import { login } from "@ajax/service";
import { AjaxError } from "@ajax/error";
import { Button, Checkbox, FormControlLabel, TextField } from "@suid/material";
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
      <TextField
        label="Name"
        value={name()}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Password"
        type={showPassword() ? "text" : "password"}
        value={password()}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel control={<Checkbox />} label="Show Password" />
      <Button onClick={handleLogin} variant="contained">
        Login
      </Button>
      <p class="error-message">{errorMessage()}</p>
    </div>
  );
};
