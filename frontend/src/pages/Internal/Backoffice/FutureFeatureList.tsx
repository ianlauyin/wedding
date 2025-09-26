import { Box, Typography } from "@suid/material";

export const FutureFeatureList = () => {
  return (
    <Box marginTop={2}>
      <Typography variant="h6">Future Features</Typography>
      <ol>
        <li>List All Guest</li>
        <li>Add Guest</li>
        <li>Remove Guest</li>
        <li>Update Guest Detail</li>
        <li>Generate Invitation address</li>
        <li>Sort Guest</li>
        <li>Search Guest</li>
      </ol>
    </Box>
  );
};
