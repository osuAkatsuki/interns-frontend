import { Box, Paper, Typography, Stack } from "@mui/material";
import { formatNumber, formatTimespan } from "../utils/formatting";
import type { Stats } from "../interfaces/stats";

export const GameplayStats = ({ statsData }: { statsData: Stats }) => {
  return (
    <Paper elevation={3}>
      {/* Overall Stats */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ pb: 1 }}>
          Gameplay Stats
        </Typography>
        <Stack direction="column">
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Performance Points</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.performancePoints)}pp
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Overall Accuracy</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.accuracy)}%
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Ranked Score</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.rankedScore)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Total Score</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.totalScore)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Play Time</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatTimespan(statsData.playTime)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Play Count</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.playCount)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Highest Combo</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.highestCombo)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>Total Hits</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.totalHits)}
            </Typography>
          </Stack>
          {/* TODO: Make grade counts a custom component of its own */}
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>SS Count (Hidden)</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.xhCount)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>SS Count (No Hidden)</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.xCount)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>S Count (Hidden)</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.shCount)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>S Count (No Hidden)</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.sCount)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ width: 1 / 2 }}>A Count</Typography>
            <Typography sx={{ width: 1 / 2, textAlign: "end" }}>
              {formatNumber(statsData.aCount)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};
