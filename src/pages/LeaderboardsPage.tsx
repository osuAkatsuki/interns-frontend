import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Box, Typography } from "@mui/material";

import { fetchManyStats } from "../adapters/stats";
import { useEffect, useState } from "react";
import { Stats } from "../interfaces/stats";
import { formatNumber } from "../utils/formatting";

import { getFlagUrl } from "../utils/countries";

export const LeaderboardsPage = () => {
  const [data, setData] = useState<Stats[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const allStats = await fetchManyStats({ page: 1, pageSize: 50 });
      if (allStats.status === "error") {
        setError("Failed to fetch data from server");
        return;
      }

      setData(allStats.data);
    };

    // run this asynchronously
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      {/* TODO: is this an antipattern? */}
      <Box sx={{ mt: 2 }}></Box>

      {error && <Alert severity="error">{error}</Alert>}

      {!data ? (
        <>
          <Typography>
            {/* TODO: https://mui.com/material-ui/react-skeleton/ */}
            The page is currently loading
          </Typography>
        </>
      ) : (
        data && (
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
                    <Typography>Performance Points</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>Ranked Score</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>Accuracy</Typography>
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
                    key={/*row.country*/ undefined}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {/* TODO: dynamic flags */}
                      <Box
                        component="img"
                        width={36}
                        height={36}
                        alt="flag-image"
                        src={getFlagUrl("CA")}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {/*row.username*/ undefined}
                    </TableCell>
                    <TableCell align="right">{formatNumber(row.performancePoints)}pp</TableCell>
                    <TableCell align="right">{formatNumber(row.rankedScore)}</TableCell>
                    <TableCell align="right">{formatNumber(row.accuracy)}%</TableCell>
                    <TableCell align="right">{formatNumber(row.playCount)}</TableCell>
                    {/* <TableCell align="right">Lv. {row.level}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  );
};
