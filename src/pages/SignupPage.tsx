import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createAccount } from "../adapters/accounts";
import { login } from "../adapters/sessions";
import { useUserContext } from "../users";

export const SignupPage = () => {
  const { user, setUser } = useUserContext();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleSignup = async () => {
    const accountResponse = await createAccount(
      username,
      password,
      firstName,
      lastName
    );
    if (accountResponse.status === "error") {
      console.log("signup failed");
      return;
    }
    // upon signup, we automatically log the user in
    const account = accountResponse.data;
    const sessionResponse = await login(username, password);
    if (sessionResponse.status === "error") {
      console.log("login failed");
      return;
    }
    if (sessionResponse.status === "success") {
      console.log("login success");
      setUser({
        session: sessionResponse.data,
        account: account,
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
      <Typography>Sign up for a new account</Typography>
      <TextField
        label="Username"
        onInput={(e) => setUsername((e.target as HTMLTextAreaElement).value)}
      ></TextField>
      <TextField
        label="Password"
        type="password"
        onInput={(e) => setPassword((e.target as HTMLTextAreaElement).value)}
      ></TextField>
      <TextField
        label="First Name"
        onInput={(e) => setFirstName((e.target as HTMLTextAreaElement).value)}
      ></TextField>
      <TextField
        label="Last Name"
        onInput={(e) => setLastName((e.target as HTMLTextAreaElement).value)}
      ></TextField>
      <Button variant="outlined" onClick={handleSignup}>
        <Typography>Submit signup</Typography>
      </Button>
    </Stack>
  );
};
