import { CircularProgress, Stack } from "@suid/material";

export const Loading = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Stack>
  );
};
