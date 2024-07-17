import React from "react";
import Navbar from "./components/Navbar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LeaderboardsPage } from "./pages/LeaderboardsPage";
import { SupportPage } from "./pages/SupportPage";
import { SettingsPage } from "./pages/SettingsPage";
import { DocumentationHomePage } from "./pages/DocumentationHomePage";
import Container from "@mui/material/Container";
import { UserContextProvider } from "./users";
import { CssBaseline } from "@mui/material";

const AppLayout = () => (
  <>
    <Navbar />
    <Container maxWidth={false}>
      <Outlet />
    </Container>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/leaderboards" element={<LeaderboardsPage />} />
      <Route path="/profile/:accountId" element={<ProfilePage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/documentation" element={<DocumentationHomePage />} />
    </Route>
  )
);

const theme = createTheme({
  palette: {
    background: {
      default: "#110e1b",
    },
    primary: {
      main: "#151222",
    },
    secondary: {
      main: "#15122233",
    },
    text: {
      primary: "#ffffff"
    },
  },
  typography: {
    fontFamily: "Nunito",
    button: {
      textTransform: 'none',
    }
  },
});

export default function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
