import { logout } from "@ajax/service";
import { formatTime } from "@util/time";

export interface Props {
  name: string;
  loginTime: string;
  onLogout: () => void;
}

export const Backoffice = ({ name, loginTime, onLogout }: Props) => {
  const handleLogout = async () => {
    logout();
    onLogout();
  };

  return (
    <div>
      Backoffice {name} {formatTime(loginTime)}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
