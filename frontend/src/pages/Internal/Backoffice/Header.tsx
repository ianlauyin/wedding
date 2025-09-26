import { logout } from "@ajax/service";
import { AppBar, Button, Stack, Toolbar, Typography } from "@suid/material";
import { formatTime } from "@util/time";

export interface Props {
  loginTime: string;
  name: string;
  onLogout: () => void;
}

export const Header = ({ loginTime, name, onLogout }: Props) => {
  const handleLogout = async () => {
    logout();
    onLogout();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Backoffice</Typography>
        <Stack alignItems="end" padding={2}>
          <Typography variant="body2">
            Login Time: {formatTime(loginTime)}
          </Typography>
          <Typography variant="body1">Name: {name}</Typography>
          <Button
            sx={{ marginTop: 2 }}
            size="small"
            onClick={handleLogout}
            color="info"
            variant="contained"
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
