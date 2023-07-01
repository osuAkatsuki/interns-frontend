import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";

import { fetchManyStats } from "../adapters/stats";
import { useEffect, useState } from "react";
import { Stats } from "../interfaces/stats";
import { formatNumber } from "../utils/formatting";

import { getFlagUrl } from "../utils/countries";
import { ClientGameMode, RelaxMode, toServerModeFromClientAndRelaxModes } from "../gameModes";

export const LeaderboardsPage = () => {
  const [data, setData] = useState<Stats[] | null>(null);
  const [gameMode, setGameMode] = useState(ClientGameMode.Standard);
  const [relaxMode, setRelaxMode] = useState(RelaxMode.Vanilla);
  const [error, setError] = useState("");

  useEffect(() => {
    const serverGameMode = toServerModeFromClientAndRelaxModes(gameMode, relaxMode);
    const fetchData = async () => {
      const allStats = await fetchManyStats({
        gameMode: serverGameMode,
        page: 1,
        pageSize: 50,
      });
      if (allStats.status === "error") {
        setError("Failed to fetch data from server");
        return;
      }

      setData(allStats.data);
    };

    // run this asynchronously
    fetchData().catch(console.error);
  }, [gameMode, relaxMode]);

  if (!data) {
    // TODO: use https://mui.com/material-ui/react-skeleton/
    return <Typography>The page is currently loading</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      {/* TODO: is this an antipattern? */}
      <Box sx={{ mt: 2 }}></Box>

      <Stack direction="column" spacing={1}>
        <Typography variant="h4">Leaderboards</Typography>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => setGameMode(ClientGameMode.Standard)}>
              Standard
            </Button>
            <Button variant="contained" onClick={() => setGameMode(ClientGameMode.Taiko)}>
              Taiko
            </Button>
            <Button variant="contained" onClick={() => setGameMode(ClientGameMode.Catch)}>
              Catch The Beat
            </Button>
            <Button variant="contained" onClick={() => setGameMode(ClientGameMode.Mania)}>
              Mania
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => setRelaxMode(RelaxMode.Vanilla)}>
              Vanilla
            </Button>
            <Button variant="contained" onClick={() => setRelaxMode(RelaxMode.Relax)}>
              Relax
            </Button>
            <Button variant="contained" onClick={() => setRelaxMode(RelaxMode.Autopilot)}>
              Autopilot
            </Button>
          </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="leaderboard-table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Country</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Username</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>Performance</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>Overall Accuracy</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>Ranked Score</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>Play Count</Typography>
                </TableCell>
                {/* <TableCell align="right">
                    <Typography>Level</Typography>
                  </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* TODO: username instead of account id */}
              {data.map((row: Stats) => (
                <TableRow
                  key={row.country}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {/* TODO: dynamic flags */}
                    <Box
                      component="img"
                      width={36}
                      height={36}
                      alt="flag-image"
                      src={getFlagUrl(row.country)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="right">{formatNumber(row.performancePoints)}pp</TableCell>
                  <TableCell align="right">{formatNumber(row.accuracy)}%</TableCell>
                  <TableCell align="right">{formatNumber(row.rankedScore)}</TableCell>
                  <TableCell align="right">{formatNumber(row.playCount)}</TableCell>
                  {/* <TableCell align="right">Lv. {row.level}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};
