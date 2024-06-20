import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingCustom = ({ title }: { title: string }) => {
  return (
    <Box textAlign={"center"} my={6}>
      <CircularProgress size={60} color="secondary" />
      <Typography variant="h6" textTransform={"capitalize"}>
        {title}
      </Typography>
    </Box>
  );
};

export default LoadingCustom;
