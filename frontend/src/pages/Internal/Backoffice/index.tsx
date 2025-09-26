import { Header, type Props as HeaderProps } from "./Header";
import "./index.css";

interface Props extends HeaderProps {}

export const Backoffice = ({ name, loginTime, onLogout }: Props) => {
  return (
    <div id="backoffice">
      <Header loginTime={loginTime} name={name} onLogout={onLogout} />
    </div>
  );
};
