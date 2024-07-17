import { Container, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { visuallyHidden } from '@mui/utils';
import { useUserContext } from "../users";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Button } from "../components/Button";
import homepage from "../content/LE.png";
import wordmarkWhite from "../content/wordmark_white.svg";
import wordmarkTrans from "../content/wordmark_transparent.svg";

export const HomePage = () => {
  const { user } = useUserContext();
  const scores = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div style={{ // what am i doing
        zIndex: "-1",
        background: `url(${homepage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: "calc(-67.5% + 550px)",
        display: "flex",
      }}>
        <img
          src={wordmarkTrans}
          style={{
            width: "100%",
            marginTop: "-10em",
            opacity: 0.5,
          }}
        />
      </div>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "6em",
          }}
        >
          <Grid xs={6}>
            <Typography variant="h2" sx={visuallyHidden /* Assistive Technology (Screen Readers) */}>Server Statistics</Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}>
              <div
                style={{
                  height: 111,
                  width: 111,
                  background: "#2C97FBB2",
                  borderRadius: "50px 50px 27px 50px",
                  boxShadow: "hsl(0deg 0% 0% / 0.2) -20px 20px",
                }}
              >

              </div>
              <Stack direction="column" sx={{ p: "0.75em" }}>
                <Typography variant="h4" fontWeight={200}>1.449.643</Typography>
                <Typography variant="subtitle1">pp earned</Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                position: "relative",
                top: -10,
              }}>
              <Stack direction="column" sx={{ p: "0.75em" }}>
                <Typography variant="h4" fontWeight={200}>92.449.643</Typography>
                <Typography variant="subtitle1">scores set</Typography>
              </Stack>
              <div
                style={{
                  height: 111,
                  width: 111,
                  background: "#A200FFB2",
                  borderRadius: "50px 50px 50px 27px",
                  boxShadow: "hsl(0deg 0% 0% / 0.2) 20px 20px",
                }}
              >

              </div>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                position: "relative",
                left: -42,
              }}>
              <div
                style={{
                  height: 111,
                  width: 111,
                  background: "#2C97FBB2",
                  borderRadius: "50px 50px 27px 50px",
                  boxShadow: "hsl(0deg 0% 0% / 0.2) -20px 20px",
                }}
              >

              </div>
              <Stack direction="column" sx={{ p: "0.75em" }}>
                <Typography variant="h4" fontWeight={200}>149.643</Typography>
                <Typography variant="subtitle1">users registered</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-around",
            }}
          >
            <img src={wordmarkWhite} style={{ width: 315, height: 64 }} />
            <Typography variant="subtitle1" textAlign="right">
              Welcome to Akatsuki!
              We are an osu! private server mainly based
              around the relax mod - featuring score submission, leaderboards &
              rankings, custom pp, and much more for relax, autopilot and vanilla osu!
            </Typography>
            <Stack
              direction="row"
              sx={{
                gap: "1em",
              }}
            >
              {user ? (
                <Link to={`/profile/${user.account.accountId}`}>
                  <Button text="My Profile" sx={{}} />
                </Link>
              ) : (
                <Link to="/signup">
                  <Button text="Get Started!" sx={{ background: "#F1F1F4", color: "#151222" }} />
                </Link>
              )}
              <Link to="/login">
                <Button text="Sign In" sx={{ background: "#15122233" }} />
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Stack
        direction="column"
        gap="2em"
        sx={{
          marginTop: "5em",
        }}
      >
        <Container>
          <Typography variant="h5" fontWeight={200} textAlign={"right"}>Recent Scores</Typography>
        </Container>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          {scores.map(s => (
            <Box>
              <Stack direction="column">
                <Typography variant="h2" sx={visuallyHidden /* Assistive Technology (Screen Readers) */}>User Info</Typography>
                <Avatar src="" />
              </Stack>
              Score {s}
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
};
