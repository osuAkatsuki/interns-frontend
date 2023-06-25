import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const ProfilePage = () => {
  const { accountId } = useParams();

  if (!accountId) {
    return (
      <>
        <Typography variant="h2">
          Must provide an account id in the path.
        </Typography>
      </>
    );
  }

  return (
    <Stack direction="column" sx={{ width: "fit-content" }}>
      <Box>Profile Banner</Box>
      <Box>Avatar / Name / Online Status</Box>
      <Box>Userpage Content</Box>
      <Stack
        direction="row"
        sx={{
          alignItems: "",
        }}
        spacing={2}
      >
        <Box>Ranking Graph</Box>
        <Box>Overall Stats</Box>
      </Stack>
      <Box>Best Scores</Box>
      <Box>Recent Scores</Box>
    </Stack>
  );
};
