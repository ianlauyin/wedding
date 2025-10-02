import { logout } from "@ajax/service";
import { DisplayUtil } from "@utils/display";

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
    <div>
      <h6>Backoffice</h6>
      <div>
        <p>Login Time: {DisplayUtil.time(loginTime)}</p>
        <p>Name: {name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
