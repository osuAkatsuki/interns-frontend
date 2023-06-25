import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import Container from "@mui/material/Container";
import { SessionContextProvider } from "./sessions";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
]);

function App() {
  return (
    <Container>
      <NavBar />
      <RouterProvider router={router} />
    </Container>
  );
}

// TODO: custom MUI theme

function AppContainer() {
  return (
    <React.StrictMode>
      <SessionContextProvider>
        <App />
      </SessionContextProvider>
    </React.StrictMode>
  );
}
export default AppContainer;
