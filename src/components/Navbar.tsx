import * as React from "react";
import { Typography, Button, Stack } from "@mui/material";
import { useUserContext, removeUserFromLocalStorage } from "../users";
import { Link } from "react-router-dom";
import { logout } from "../adapters/webSessions";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { FavoriteOutlined, Logout, Settings } from "@mui/icons-material";

export default function Navbar() {
  const { user, setUser } = useUserContext();

  // Account settings menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accountSettingsOpen = Boolean(anchorEl);
  const handleAccountSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountSettingsClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    if (!user) {
      console.warn("User attempted a logout without being logged in");
      return;
    }
    await logout(user.session.sessionId);
    removeUserFromLocalStorage();
    setUser(null);

    handleAccountSettingsClose();
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* Left Navbar */}
        <Stack direction="row" spacing={1} sx={{ display: "flex" }}>
          <Link to="/">
            <Button>
              <Typography variant="subtitle1">Akatsuki</Typography>
            </Button>
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link to="/leaderboards">
            <Button>
              <Typography variant="subtitle1">Leaderboards</Typography>
            </Button>
          </Link>
          <Link to="/documentation">
            <Button>
              <Typography variant="subtitle1">Documentation</Typography>
            </Button>
          </Link>
        </Stack>
        {/* Right Navbar */}
        <Stack direction="row" spacing={1}>
          {/* TODO: add user search bar */}
          {user ? (
            <>
              <Link to="/support">
                {/* TODO: heart emoji */}
                <IconButton aria-label="support">
                  <FavoriteOutlined sx={{ color: "#db2828" }} />
                </IconButton>
              </Link>

              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleAccountSettingsClick}
                  aria-controls={accountSettingsOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={accountSettingsOpen ? "true" : undefined}
                >
                  {/* TODO: is const 24x24 really a good idea? breakpoints? */}
                  {/* TODO: store avatarUrl on a per-user basis; ideally w/ breakpoints */}
                  <Avatar sx={{ width: 24, height: 24 }} src="https://a.akatsuki.gg/1001" />
                </IconButton>
              </Tooltip>
              <Button onClick={handleAccountSettingsClick}>
                <Typography variant="subtitle1">{user.account.firstName}</Typography>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>
                  <Typography variant="subtitle1">Login</Typography>
                </Button>
              </Link>
              <Link to="/signup">
                <Button>
                  <Typography variant="subtitle1">Signup</Typography>
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Stack>
      {user && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={accountSettingsOpen}
          onClose={handleAccountSettingsClose}
          onClick={handleAccountSettingsClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link to={`/profile/${user.account.accountId}`}>
            <MenuItem onClick={handleAccountSettingsClose}>
              <Avatar />
              Profile
            </MenuItem>
          </Link>
          <Divider />
          <Link to="/settings">
            <MenuItem onClick={handleAccountSettingsClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
