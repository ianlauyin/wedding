import { logout } from "@ajax/service";
import Button from "@components/Button";
import { DisplayUtil } from "@utils/DisplayUtil";

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
    <div class="flex justify-between bg-info p-2 items-center">
      <h1 class="text-2xl font-bold p-4">Backoffice</h1>
      <div class="flex flex-col items-end w-max">
        <Button class="btn-xs btn-error mb-4" onClick={handleLogout}>
          Logout
        </Button>
        <p class="text-xs">Login Time: {DisplayUtil.time(props.loginTime)}</p>
        <p>Name: {props.name}</p>
      </div>
    </div>
  );
};
