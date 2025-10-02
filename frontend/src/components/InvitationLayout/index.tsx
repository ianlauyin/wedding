export interface Props {
  name?: string;
}

export const InvitationLayout = (props: Props) => {
  return (
    <div>
      <h1>Hello {props.name}</h1>
    </div>
  );
};
