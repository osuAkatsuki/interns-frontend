import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSessionContext } from "../sessions";
import { login } from "../adapters/sessions";

export const LoginPage = () => {
  const { session, setSession } = useSessionContext();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    const loginResponse = await login(username, password);
    if (loginResponse.status === "success") {
      console.log("login success", session);
      setSession(loginResponse.data);
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
      {session !== null && (
        <Typography>Logged in as {session?.sessionId}</Typography>
      )}
    </Stack>
  );
};
