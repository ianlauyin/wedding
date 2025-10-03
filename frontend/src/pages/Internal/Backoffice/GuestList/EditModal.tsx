import { GuestInfoView } from "wedding-interface";

interface Props {
  guest: GuestInfoView | true;
  refreshList: () => void;
}

export const EditModal = (props: Props) => {
  return <div>Edit Modal</div>;
};
