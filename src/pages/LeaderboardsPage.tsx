import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

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

function createData(
  username: string,
  country: string,
  overall_pp: number,
  ranked_score: number,
  overall_acc: number,
  playcount: number,
  level: number
): LeaderboardEntry {
  return {
    username,
    country,
    overall_pp,
    ranked_score,
    overall_acc,
    playcount,
    level,
  };
}

const rows = [
  createData("Stixe", "CA", 14432, 10326356470, 98.11, 28682, 100),
  createData("int", "CA", 14333, 6145246065, 99.06, 1273, 98),
  createData("Snowy LP", "CA", 13316, 2049116106, 98.76, 12362, 97),
  createData("A21", "CA", 13274, 4970837120, 98.26, 18816, 100),
  createData("KeikoL", "CA", 12607, 12503478215, 98.17, 57500, 101),
  createData("Mistral", "CA", 12510, 9979978243, 99.08, 6385, 100),
  createData("Mahmood", "CA", 12373, 4726166418, 98.42, 8860, 98),
  createData("Rasis", "CA", 12267, 8682391067, 98.91, 5985, 99),
  createData("qstronaut", "CA", 12219, 8835158326, 98.84, 13607, 100),
  createData("mercy", "CA", 12056, 11719734719, 98.42, 17080, 100),
  createData("NyanPotato", "CA", 12016, 508431027, 95.88, 1288, 61),
  createData("Neox", "CA", 12000, 8055390739, 98.63, 8182, 100),
  createData("Cloutiful", "CA", 11738, 613987418, 97.67, 2486, 73),
  createData("qsc20010", "CA", 11654, 95312017660, 98.79, 79942, 103),
  createData("fortnite demon", "CA", 11415, 8888895097, 99.42, 5629, 100),
  createData("dexhatesmilk", "CA", 11410, 5155780842, 99.09, 7991, 100),
  createData("xena", "CA", 11382, 496678060, 97.65, 892, 65),
  createData("badEU", "CA", 11248, 4023779388, 97.95, 2052, 95),
  createData("Jeong Woo Yeong", "CA", 11168, 979167433, 98.45, 2058, 75),
  createData("gnahus", "CA", 11056, 1242427059, 98.11, 1504, 82),
  createData("baltika_9", "CA", 11003, 20876500168, 98.65, 19279, 100),
  createData("Nembo", "CA", 10921, 6512005970, 97.15, 19064, 100),
  createData("Nethersonic", "CA", 10873, 3139667475, 98.12, 11390, 99),
  createData("lllegend1274", "CA", 10868, 2556725967, 99.04, 629, 89),
  createData("burger fox", "CA", 10860, 3477514664, 98.0, 4122, 98),
  createData("pepsi man", "CA", 10829, 879143863, 96.82, 14822, 97),
  createData("KAARIS", "CA", 10809, 13951860967, 98.69, 9239, 100),
  createData("Maxim Bogdan", "CA", 10741, 1843921175, 98.0, 11519, 99),
  createData("Caligula", "CA", 10625, 405020191, 96.33, 1255, 55),
  createData("Grace", "CA", 10512, 19136788111, 97.81, 19030, 100),
  createData("SenPy", "CA", 10377, 8843848253, 99.1, 1356, 99),
  createData("contrail", "CA", 10319, 5254398236, 98.6, 4365, 99),
  createData("ZuelesOK", "CA", 10234, 4700793872, 98.77, 1273, 97),
  createData("Uban", "CA", 10220, 6976207517, 98.82, 5753, 100),
  createData("MOBYDEET", "CA", 10188, 3955058225, 98.73, 2225, 98),
  createData("Plasma", "CA", 10108, 518640957, 97.7, 1329, 66),
  createData("RLAM", "CA", 10041, 19604013222, 98.98, 6134, 100),
  createData("Illegal", "CA", 10034, 1752239496, 98.65, 14412, 98),
  createData("Anisphia", "CA", 10020, 1569970500, 98.22, 1812, 79),
  createData("Impressivebear", "CA", 9968, 7986533358, 98.21, 12809, 100),
  createData("Asahina Momoko", "CA", 9831, 4833248015, 99.62, 2220, 98),
  createData("[ ]", "CA", 9804, 6308668906, 98.91, 8976, 99),
  createData("Ayanami", "CA", 9799, 329367550, 97.62, 837, 50),
  createData("Yukihana", "CA", 9771, 28383136971, 98.8, 31691, 100),
  createData("sleepGod_", "CA", 9663, 9404339022, 98.53, 7223, 100),
  createData("[ Master ]", "CA", 9652, 413459229, 97.49, 636, 51),
  createData("Oyadeh", "CA", 9640, 21385416623, 98.57, 17944, 100),
  createData("Raikouhouosu", "CA", 9638, 1002127195, 98.89, 283, 67),
  createData("HeyCat_", "CA", 9614, 1256280232, 97.57, 977, 80),
  createData("cool_dude35", "CA", 9555, 7035650625, 98.69, 23665, 100),
];

export const LeaderboardsPage = () => {
  return (
    <>
      {/* TODO: is this an antipattern? */}
      <Box sx={{ mt: 2 }}></Box>

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
            {rows.map((row) => (
              <TableRow
                key={row.username}
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
                    src={`https://flagcdn.com/${row.country.toLowerCase()}.svg`}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">
                  {EN_US_NUMBER_FORMAT.format(row.overall_pp)}
                </TableCell>
                <TableCell align="right">
                  {EN_US_NUMBER_FORMAT.format(row.ranked_score)}
                </TableCell>
                <TableCell align="right">{row.overall_acc}%</TableCell>
                <TableCell align="right">
                  {EN_US_NUMBER_FORMAT.format(row.playcount)}
                </TableCell>
                <TableCell align="right">Lv. {row.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
