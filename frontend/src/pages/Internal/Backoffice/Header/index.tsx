import { logout } from "@ajax/service";
import { formatTime } from "@util/time";
import "./index.css";

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
    <div class="header">
      <h1>Backoffice</h1>
      <div class="header-right">
        <p class="login-time">Login Time: {formatTime(loginTime)}</p>
        <p class="name">Name: {name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
