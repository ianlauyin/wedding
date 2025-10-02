import { GuestInfoView } from "wedding-interface";
import { DisplayUtil } from "@utils/display";

export interface Props {
  list: Array<GuestInfoView>;
}

export const GuestList = ({ list }: Props) => {
  const mapRow = (guest: GuestInfoView) => {
    return (
      <tr onClick={() => console.log(guest)}>
        <td>
          {DisplayUtil.side(guest.side)}
          <br />({guest.relationship})
        </td>
        <td>{guest.name}</td>
        <td>
          {guest.confirmedCount}/{guest.estimatedCount}
        </td>
      </tr>
    );
  };

  return (
    <div style={{ "justify-self": "center", "max-width": "1300px" }}>
      <table>
        <thead>
          <tr>
            <td>Relationship</td>
            <td>Name</td>
            <td>Counts (Confirmed/Estimated)</td>
          </tr>
        </thead>
        <tbody>{list.map(mapRow)}</tbody>
      </table>
    </div>
  );
};
