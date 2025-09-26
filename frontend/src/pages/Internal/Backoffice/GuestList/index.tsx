import { GuestInfoView } from "wedding-interface";
import "./index.css";

export interface Props {
  list: Array<GuestInfoView>;
}

export const GuestList = ({ list }: Props) => {
  return (
    <table class="guest-list-table">
      <thead>
        <tr>
          <th>Side</th>
          <th></th>
          <th>Count (Confirmed/Estimated)</th>
          <th>Extra</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((guest) => (
          <tr>
            <td>{guest.side}</td>
            <td>{guest.name}</td>
            <td>
              {guest.confirmedCount}/{guest.estimatedCount}
            </td>
            <td>{guest.relationship}</td>
            <td>
              <button>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
