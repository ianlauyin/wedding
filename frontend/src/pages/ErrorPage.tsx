import { Box, Stack, Typography } from "@suid/material";

export interface Props {
  message: string;
}

export const ErrorPage = ({ message }: Props) => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center" gap={2}>
      <Typography variant="h4">Oops!</Typography>
      <Typography variant="h5">Something went wrong :(</Typography>
      <Typography variant="body1">Error: {message}</Typography>
      <Typography variant="body1">
        Please contact Ian/Claire if we sent you here
      </Typography>
    </Stack>
  );
};
