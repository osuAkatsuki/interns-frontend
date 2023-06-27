import { useParams } from "react-router-dom";
import { Typography, Paper, Divider, List } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { fetchManyScores } from "../adapters/scores";
import { Score } from "../interfaces/scores";
import { Failure, Success } from "../interfaces/api";

export const ProfilePage = () => {
  const [data, setData] = useState<Score[] | null>(null);
  const [isLoading, setLoading] = useState(false); // is this a reason to sep from data!=null?
  const [error, setError] = useState("");
  const { accountId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const allStats = await fetchManyScores({
        page: 1,
        pageSize: 50,
        sortBy: "performance_points",
      });
      if (allStats.status === "error") {
        setError("Failed to fetch data from server");
        return;
      }

      setData(allStats.data);
    };

    // run this asynchronously
    fetchData().catch(console.error);
  }, []);

  if (!accountId) {
    return (
      <>
        <Typography variant="h2">
          Must provide an account id in the path.
        </Typography>
      </>
    );
  }
  const userpageContent = "Hello World!"; // TODO: dynamic

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
          sx={{ justifyContent: "space-evenly" }}
        >
          <Box sx={{ width: 3 / 5 }}>
            <Paper elevation={3} sx={{ height: 1 / 1 }}>
              {/* Ranking Graph */}
              <Stack direction="column" sx={{ p: 2 }}>
                <Typography>Gaming</Typography>
                <Typography>Gaming</Typography>
              </Stack>
            </Paper>
          </Box>
          <Box sx={{ width: 2 / 5 }}>
            <Paper elevation={3}>
              {/* Overall Stats */}
              <Stack direction="column" sx={{ p: 2 }}>
                {/* TODO: this should be a table */}
                <Typography>Total Score</Typography>
                <Typography>Ranked Score</Typography>
                <Typography>Performance Points</Typography>
                <Typography>Play Count</Typography>
                <Typography>Play Time</Typography>
                <Typography>Accuracy</Typography>
                <Typography>Highest Combo</Typography>
                <Typography>Total Hits</Typography>
                <Typography>SS Count (Hidden)</Typography>
                <Typography>SS Count (No Hidden)</Typography>
                <Typography>S Count (Hidden)</Typography>
                <Typography>S Count (No Hidden)</Typography>
                <Typography>A Count</Typography>
              </Stack>
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
