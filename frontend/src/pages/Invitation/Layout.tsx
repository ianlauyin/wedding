import { InvitationInfoResponse } from "wedding-interface";

export interface Props {
  guestInfo?: InvitationInfoResponse;
}

export const Layout = (props: Props) => {
  return (
    <div>
      Invitation Layout
      <h1>{props.guestInfo?.name || "No Name"}</h1>
    </div>
  );
};
