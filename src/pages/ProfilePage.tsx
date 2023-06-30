import { useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { fetchManyScores } from "../adapters/scores";
import { Score } from "../interfaces/scores";
import { Stats } from "../interfaces/stats";
import { fetchStats } from "../adapters/stats";
import { formatMods } from "../utils/mods";

const EN_US_NUMBER_FORMAT = new Intl.NumberFormat("en-us");

const formatPlayTime = (value: number): string => {
  return "TODO";
  // TODO: `23d 12h 34m 56s` type thing
};

export const ProfilePage = () => {
  const [bestScores, setBestScores] = useState<Score[] | null>(null);
  const [recentScores, setRecentScores] = useState<Score[] | null>(null);
  const [statsData, fetchModeStats] = useState<Stats | null>(null);
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
          <Box sx={{ width: 3 / 5 }}>
            <Paper elevation={3} sx={{ height: 1 / 1 }}>
              {/* Ranking Graph */}
              <Box sx={{ p: 2 }}>
                <Typography>TODO: Ranking graph here</Typography>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ width: 2 / 5 }}>
            <Paper elevation={3}>
              {/* Overall Stats */}
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Userpage</Typography>
                <Stack direction="column">
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Performance Points</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.performancePoints)}pp
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Total Score</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.totalScore)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Ranked Score</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.rankedScore)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Play Count</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.playCount)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Play Time</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {formatPlayTime(statsData.playTime)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Accuracy</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.accuracy)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Highest Combo</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.highestCombo)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>Total Hits</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.totalHits)}
                    </Typography>
                  </Stack>
                  {/* TODO: Make grade counts a custom component of its own */}
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>SS Count (Hidden)</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.xhCount)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>SS Count (No Hidden)</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.xCount)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>S Count (Hidden)</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.shCount)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>S Count (No Hidden)</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.sCount)}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 / 2 }}>A Count</Typography>
                    <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
                      {EN_US_NUMBER_FORMAT.format(statsData.aCount)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Stack>
        <Box>
          <Paper elevation={3}>
            {/* Best Scores */}
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Best Scores</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="best scores table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography>Grade</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Beatmap</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Performance</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Score</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Accuracy</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Combo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Submitted At</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bestScores.map((score: Score) => (
                      <TableRow>
                        {/* TODO: images for the grades */}
                        <TableCell>{score.grade}</TableCell>
                        {/* TODO: full beatmap name & diffname */}
                        {/* TODO: clickable to go to beatmap page */}
                        <TableCell>
                          <Typography>
                            {score.beatmapMd5} {score.mods ? `+${formatMods(score.mods)}` : ""}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {EN_US_NUMBER_FORMAT.format(score.performancePoints)}pp
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{EN_US_NUMBER_FORMAT.format(score.score)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{EN_US_NUMBER_FORMAT.format(score.accuracy)}%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{EN_US_NUMBER_FORMAT.format(score.highestCombo)}x</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{score.createdAt.toLocaleString("en-US")}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Box>
        <Box>
          {/* Recent Scores */}
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Recent Scores</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="recent scores table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography>Grade</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Beatmap</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Performance</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Score</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Accuracy</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Combo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Submitted At</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentScores.map((score: Score) => (
                      <TableRow>
                        {/* TODO: images for the grades */}
                        <TableCell>{score.grade}</TableCell>
                        {/* TODO: full beatmap name & diffname */}
                        {/* TODO: clickable to go to beatmap page */}
                        <TableCell>
                          <Typography>
                            {score.beatmapMd5} {score.mods ? `+${formatMods(score.mods)}` : ""}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{score.performancePoints}pp</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{score.score}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{score.accuracy}%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{score.highestCombo}x</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{score.createdAt.toLocaleString("en-US")}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Box>
      </Stack>
    </>
  );
};
