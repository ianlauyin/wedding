import { logout } from "@ajax/service";
import { DisplayUtil } from "@utils/display";

export interface Props {
  loginTime: string;
  name: string;
  onLogout: () => void;
}

export const Header = (props: Props) => {
  const handleLogout = async () => {
    logout();
    props.onLogout();
  };

  return (
    <div>
      <h6>Backoffice</h6>
      <div>
        <p>Login Time: {DisplayUtil.time(props.loginTime)}</p>
        <p>Name: {props.name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
