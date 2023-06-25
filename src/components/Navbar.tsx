import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useUserContext } from "../users";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useUserContext();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
      }}
    >
      {/* Left Navbar */}
      <Box>
        <Link to="/">
          <Button>
            <Typography variant="h6">Akatsuki</Typography>
          </Button>
        </Link>
        <Link to="/leaderboards">
          <Button>
            <Typography variant="h6">Leaderboards</Typography>
          </Button>
        </Link>
      </Box>
      {/* Right Navbar */}
      <Stack direction="row" spacing={1}>
        {/* TODO: add user search bar */}
        {user ? (
          <>
            <Link to="/support">
              <Button>
                {/* TODO: heart emoji */}
                <Typography variant="h6">Support</Typography>
              </Button>
            </Link>
            <Link to={`/profile/${user.account.accountId}`}>
              <Button>
                <Typography variant="h6">{user.account.firstName}</Typography>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button>
                <Typography variant="h6">Login</Typography>
              </Button>
            </Link>
            <Link to="/signup">
              <Button>
                <Typography variant="h6">Signup</Typography>
              </Button>
            </Link>
          </>
        )}
      </Stack>
    </Stack>
  );
}
