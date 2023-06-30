import { useParams } from "react-router-dom";
import { Typography, Paper, Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { fetchManyScores } from "../adapters/scores";
import { Score } from "../interfaces/scores";
import { Stats } from "../interfaces/stats";
import { fetchStats } from "../adapters/stats";
import { GameplayStats } from "../components/GameplayStats";
import { Scores } from "../components/Scores";
import { RankingGraph } from "../components/RankingGraph";

export const ProfilePage = () => {
  const [bestScores, setBestScores] = useState<Score[] | null>(null);
  const [recentScores, setRecentScores] = useState<Score[] | null>(null);
  const [statsData, fetchModeStats] = useState<Stats | null>(null);
  const rankHistoryData = null; // TODO
  const [error, setError] = useState("");

  const { accountId } = useParams();

  useEffect(() => {
    const fetchProfileBestScores = async () => {
      if (!accountId) return;

      const playerBestScores = await fetchManyScores({
        accountId: parseInt(accountId), // TODO: need to fix backend
        page: 1,
        pageSize: 50,
        sortBy: "performance_points",
      });
      if (playerBestScores.status === "error") {
        setError("Failed to fetch data from server");
        return;
      }

      setBestScores(playerBestScores.data);
    };

    // run this asynchronously
    fetchProfileBestScores().catch(console.error);
  }, [accountId]);

  useEffect(() => {
    const fetchProfileRecentScores = async () => {
      if (!accountId) return;

      const playerRecentScores = await fetchManyScores({
        accountId: parseInt(accountId), // TODO: need to fix backend
        page: 1,
        pageSize: 50,
        sortBy: "created_at",
      });
      if (playerRecentScores.status === "error") {
        setError("Failed to fetch data from server");
        return;
      }

      setRecentScores(playerRecentScores.data);
    };

    // run this asynchronously
    fetchProfileRecentScores().catch(console.error);
  }, [accountId]);

  useEffect(() => {
    const fetchProfileStats = async () => {
      if (!accountId) return;

      const playerStats = await fetchStats(
        parseInt(accountId), // TODO: need to fix on backend
        0 // TODO: other gamemodes
      );
      if (playerStats.status === "error") {
        setError("Failed to fetch data from server");
        return;
      }

      fetchModeStats(playerStats.data);
    };

    // run this asynchronously
    fetchProfileStats().catch(console.error);
  }, [accountId]);

  if (!accountId) {
    return (
      <>
        <Typography variant="h2">Must provide an account id in the path.</Typography>
      </>
    );
  }
  const userpageContent = undefined; //"Hello World!"; // TODO: dynamic

  if (!statsData || !bestScores || !recentScores) {
    // loading state
    return <>loading data</>;
  }
  if (error) {
    return <Alert severity="error">Something went wrong while loading the page</Alert>;
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
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-evenly" }}>
          <Box sx={{ width: 2 / 3 }}>
            <RankingGraph rankHistoryData={rankHistoryData} />
          </Box>
          <Box sx={{ width: 1 / 3 }}>
            <GameplayStats statsData={statsData} />
          </Box>
        </Stack>
        <Box>
          <Scores scoresData={bestScores} title="Best Scores" />
        </Box>
        <Box>
          <Scores scoresData={recentScores} title="Recent Scores" />
        </Box>
      </Stack>
    </>
  );
};
