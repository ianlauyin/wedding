import { createSignal } from "solid-js";
import { LoginResponse } from "wedding-interface";
import { login } from "@ajax/service";
import { AjaxError } from "@ajax/error";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@suid/material";
import { ErrorMessage } from "@components/ErrorMessage";

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
    <Stack maxWidth="sm" justifySelf="center" padding={3} gap={3}>
      <Typography variant="h4">Admin Login Page</Typography>
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
      <Button
        disabled={name() === "" || password() === ""}
        onClick={handleLogin}
        variant="contained"
      >
        Login
      </Button>
      <ErrorMessage message={errorMessage()} />
    </Stack>
  );
};
