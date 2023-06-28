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
import { useUserContext } from "../users";

const EN_US_NUMBER_FORMAT = new Intl.NumberFormat("en-us");

interface LeaderboardEntry {
  username: string;
  country: string;
  overall_pp: number;
  ranked_score: number;
  overall_acc: number;
  playcount: number;
  level: number;
}

export const LeaderboardsPage = () => {
  const [data, setData] = useState<Stats[] | null>(null);
  const [isLoading, setLoading] = useState(false); // is this a reason to sep from data!=null?
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

      {isLoading ? (
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
                  <TableCell align="right">
                    <Typography>Level</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* TODO: username instead of account id */}
                {data.map((row) => (
                  <TableRow
                    key={/*row.country*/ undefined}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Box
                        component="img"
                        sx={{
                          height: 36 / 2,
                          width: 36,
                          boxShadow: 2,
                        }}
                        alt="flag-image"
                        src={`https://flagcdn.com/${/*row.country*/ "ca".toLowerCase()}.svg`}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {/*row.username*/ undefined}
                    </TableCell>
                    <TableCell align="right">
                      {EN_US_NUMBER_FORMAT.format(row.performancePoints)}
                    </TableCell>
                    <TableCell align="right">
                      {EN_US_NUMBER_FORMAT.format(row.rankedScore)}
                    </TableCell>
                    <TableCell align="right">{row.accuracy}%</TableCell>
                    <TableCell align="right">{EN_US_NUMBER_FORMAT.format(row.playCount)}</TableCell>
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
