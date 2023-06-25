import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSessionContext } from "../sessions";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { session } = useSessionContext();

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
      </Box>
      {/* Right Navbar */}
      <Stack direction="row" spacing={1}>
        {/* TODO: add search bar */}
        {session ? (
          <>
            <Link to="/profile">
              <Button>
                <Typography variant="h6">{session?.firstName}</Typography>
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
