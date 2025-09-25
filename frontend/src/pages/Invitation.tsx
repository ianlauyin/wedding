import { useParams } from "@solidjs/router";
import { NotFound } from "../component/NotFound";

export const Invitation = () => {
  const { id } = useParams();
  if (!id) return <NotFound />; // Replace with id validation
  return <div>Invitation {id}</div>;
};
