import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createAccount } from "../adapters/accounts";
import { login } from "../adapters/sessions";
import { useUserContext } from "../users";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();

  const { setUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [signupError, setSignupError] = useState("");

  const handleSignup = async () => {
    // sign up
    const accountResponse = await createAccount(
      username,
      password,
      firstName,
      lastName
    );
    if (accountResponse.status === "error") {
      setSignupError(`${accountResponse.message} (${accountResponse.error})`);
      console.error("signup failed", accountResponse);
      return;
    }

    // upon signup, we automatically log the user in
    const account = accountResponse.data;
    const sessionResponse = await login(username, password);
    if (sessionResponse.status === "error") {
      setSignupError(`${sessionResponse.message} (${sessionResponse.error})`);
      console.error("login failed", sessionResponse);
      return;
    }

    // handle success
    setSignupError("");
    console.log("login success");
    setUser({
      session: sessionResponse.data,
      account: account,
    });
    // Redirect the user to "/" once they've signed up
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
      <Typography>Sign up for a new account</Typography>
      {signupError && <Alert severity="error">{signupError}</Alert>}
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
