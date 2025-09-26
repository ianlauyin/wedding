import { Typography } from "@suid/material";

export const ErrorMessage = ({ message }: { message: string }) => {
  return <Typography color="red">{message}</Typography>;
};
