import { InvitationInfoResponse } from "wedding-interface";

export interface Props {
  info: InvitationInfoResponse;
}

export const InvitationLayout = ({ info }: Props) => {
  return (
    <div>
      <h1>Hello {info.name}</h1>
    </div>
  );
};
