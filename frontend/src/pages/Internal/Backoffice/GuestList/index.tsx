import { GuestInfoView } from "wedding-interface";
import "./index.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@suid/material";

export interface Props {
  list: Array<GuestInfoView>;
}

export const GuestList = ({ list }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Side</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Count (Confirmed/Estimated)</TableCell>
            <TableCell>Relationship</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((guest) => (
            <TableRow>
              <TableCell>{guest.side}</TableCell>
              <TableCell>{guest.name}</TableCell>
              <TableCell>
                {guest.confirmedCount}/{guest.estimatedCount}
              </TableCell>
              <TableCell>{guest.relationship}</TableCell>
              <TableCell>
                <Button>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
