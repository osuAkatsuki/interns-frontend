import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export const HomePage = () => {
  return (
    <Stack
      direction="column"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h2">Welcome to Akatsuki</Typography>
      <Typography variant="h4">
        The largest competitive osu! private server
      </Typography>
    </Stack>
  );
};
