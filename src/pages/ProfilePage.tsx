import { useParams } from "react-router-dom";
import { Typography, Paper, Alert, Avatar } from "@mui/material";
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
import { fetchOneAccount } from "../adapters/accounts";
import { Account } from "../interfaces/accounts";

export const ProfilePage = () => {
  const [bestScores, setBestScores] = useState<Score[] | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [recentScores, setRecentScores] = useState<Score[] | null>(null);
  const [statsData, fetchModeStats] = useState<Stats | null>(null);
  const rankHistoryData = null; // TODO
  const [error, setError] = useState("");
  const { accountId } = useParams();

  const osuSession = null;

  useEffect(() => {
    const fetchProfileAccount = async () => {
      if (!accountId) return;

      const account = await fetchOneAccount(parseInt(accountId));
      if (account.status === "error") {
        setError("Failed to fetch data from server");
        return;
      }

      setAccount(account.data);
    };

    // run this asynchronously
    fetchProfileAccount().catch(console.error);
  }, [accountId]);

  useEffect(() => {
    const fetchProfileBestScores = async () => {
      if (!accountId) return;

      const playerBestScores = await fetchManyScores({
        accountId: parseInt(accountId),
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

  if (error) {
    return <Alert severity="error">Something went wrong while loading the page</Alert>;
  }
  if (!account || !statsData || !bestScores || !recentScores) {
    // loading state
    return <>loading data</>;
  }

  return (
    <>
      {/* TODO: is this an antipattern? */}
      <Box sx={{ mt: 2 }}></Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Box>
            {/* Avatar / Name / Online Status */}
            <Paper elevation={3}>
              <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                <Avatar
                  alt="user-avatar"
                  src="https://a.akatsuki.gg/1001"
                  sx={{ width: 124, height: 124 }}
                />
                <Stack direction="column">
                  <Typography variant="h5">{account.username}</Typography>
                  <Typography variant="subtitle1">{osuSession ? "Online" : "Offline"}</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "space-evenly" }}>
            <Box sx={{ width: 1 / 3 }}>
              <GameplayStats statsData={statsData} />
            </Box>
            <Box sx={{ width: 2 / 3 }}>
              <RankingGraph rankHistoryData={rankHistoryData} />
            </Box>
          </Stack>
          <Box>
            <Scores scoresData={bestScores} title="Best Scores" />
          </Box>
          <Box>
            <Scores scoresData={recentScores} title="Recent Scores" />
          </Box>
        </Stack>
      </Paper>
    </>
  );
};
