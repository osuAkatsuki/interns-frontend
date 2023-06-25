import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUserContext } from "../users";
import { login } from "../adapters/sessions";
import { fetchOneAccount } from "../adapters/accounts";

export const LoginPage = () => {
  const { user, setUser } = useUserContext();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    const sessionResponse = await login(username, password);
    if (sessionResponse.status === "failure") {
      console.log("login failed");
      return;
    }
    const accountResponse = await fetchOneAccount(
      sessionResponse.data.accountId
    );
    if (accountResponse.status === "failure") {
      console.log("login failed");
      return;
    }
    if (sessionResponse.status === "success") {
      console.log("login success");
      setUser({
        session: sessionResponse.data,
        account: accountResponse.data,
      });
    } else {
      console.log("login failed");
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      spacing={2}
    >
      <Typography>Sign in to an existing account</Typography>
      <TextField
        label="Username"
        onInput={(e) => setUsername((e.target as HTMLTextAreaElement).value)}
      ></TextField>
      <TextField
        label="Password"
        type="password"
        onInput={(e) => setPassword((e.target as HTMLTextAreaElement).value)}
      ></TextField>
      <Button variant="outlined" onClick={handleLogin}>
        <Typography>Submit login</Typography>
      </Button>
      {user && <Typography>Logged in as {user?.session.sessionId}</Typography>}
    </Stack>
  );
};
