import { FutureFeatureList } from "./FutureFeatureList";
import { GuestList } from "./GuestList";
import { Header, type Props as HeaderProps } from "./Header";

interface Props extends HeaderProps {}

export const Backoffice = (props: Props) => {
  return (
    <>
      <Header
        loginTime={props.loginTime}
        name={props.name}
        onLogout={props.onLogout}
      />
      <div class="flex flex-col mx-4">
        <GuestList />
        <div class="divider" />
        <FutureFeatureList />
      </div>
    </>
  );
};
