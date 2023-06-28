import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUserContext } from "../users";
import { login } from "../adapters/sessions";
import { fetchOneAccount } from "../adapters/accounts";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { setUser } = useUserContext();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginError, setLoginError] = React.useState("");

  const handleLogin = async () => {
    // login
    const sessionResponse = await login(username, password);
    if (sessionResponse.status === "error") {
      setLoginError(`${sessionResponse.message} (${sessionResponse.error})`);
      console.error("login failed", sessionResponse);
      return;
    }

    // fetch account data
    const accountResponse = await fetchOneAccount(sessionResponse.data.accountId);
    if (accountResponse.status === "error") {
      setLoginError(`${accountResponse.message} (${accountResponse.error})`);
      console.error("login failed", accountResponse);
      return;
    }

    // handle success
    setLoginError("");
    console.log("login success");
    setUser({
      session: sessionResponse.data,
      account: accountResponse.data,
    });
    // Redirect the user to "/" once they've logged in
    // TODO: can i display a success alert on the homepage?
    navigate("/", { replace: true });
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
      {loginError && <Alert severity="error">{loginError}</Alert>}
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
    </Stack>
  );
};
