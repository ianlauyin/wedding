export interface Props {
  name?: string;
}

export const InvitationLayout = ({ name }: Props) => {
  return (
    <div>
      <h1>Hello {name}</h1>
    </div>
  );
};
