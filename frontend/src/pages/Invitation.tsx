import { useParams } from "@solidjs/router";

export const Invitation = () => {
  const { id } = useParams();
  return <div>Invitation {id}</div>;
};
