import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { useSessionContext } from "../sessions";

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
        <Link href="/">
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
            <Link href="/profile">
              <Button>
                <Typography variant="h6">{session?.firstName}</Typography>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button>
                <Typography variant="h6">Login</Typography>
              </Button>
            </Link>
            <Link href="/signup">
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
