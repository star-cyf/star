import { Box, Typography } from "@mui/material";
import { ErrorProps } from "../types/components";

const Error = ({ message }: ErrorProps) => {
  return (
    <Box>
      <Typography>Error</Typography>
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default Error;
