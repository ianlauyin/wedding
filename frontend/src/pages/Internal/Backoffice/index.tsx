export interface Props {
  name: string;
  loginTime: string;
}

export const Backoffice = ({ name, loginTime }: Props) => {
  return (
    <div>
      Backoffice {name} {loginTime}
    </div>
  );
};
