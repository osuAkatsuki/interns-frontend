import { useParams } from "react-router-dom";
import { Typography, Paper, Divider, List } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const ProfilePage = () => {
  const { accountId } = useParams();
  const userpageContent = "Hello World!"; // TODO: dynamic

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
    <>
      {/* TODO: is this an antipattern? */}
      <Box sx={{ mt: 2 }}></Box>

      <Stack direction="column" spacing={2}>
        <Box>
          {/* Avatar / Name / Online Status */}
          <Paper elevation={3} sx={{ p: 2, height: "12rem" }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography>Gaming</Typography>
              <Typography>Gaming</Typography>
              <Typography>Gaming</Typography>
            </Stack>
          </Paper>
        </Box>
        {userpageContent && (
          <Box>
            {/* Userpage Content */}
            <Paper elevation={3} sx={{ p: 2, height: "12rem" }}>
              <Stack direction="column">
                <Typography variant="h6">Userpage</Typography>
                <Typography variant="body1">{userpageContent}</Typography>
              </Stack>
            </Paper>
          </Box>
        )}
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Box>
            <Paper elevation={3} sx={{ p: 2, height: "12rem" }}>
              {/* Ranking Graph */}
              <Stack direction="column">
                <Typography>Gaming</Typography>
                <Typography>Gaming</Typography>
              </Stack>
            </Paper>
          </Box>
          <Box>
            <Paper elevation={3} sx={{ p: 2 }}>
              {/* Overall Stats */}
              <Typography>Gaming</Typography>
            </Paper>
          </Box>
        </Stack>
        <Box>
          {/* Best Scores */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Best Scores</Typography>
            <List></List>
          </Paper>
        </Box>
        <Box>
          {/* Recent Scores */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Recent Scores</Typography>
            <List></List>
          </Paper>
        </Box>
      </Stack>
    </>
  );
};
