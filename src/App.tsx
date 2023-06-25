import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import Container from "@mui/material/Container";
import { SessionContextProvider } from "./sessions";

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>
  )
);

function App() {
  return (
    <React.StrictMode>
      <SessionContextProvider>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </SessionContextProvider>
    </React.StrictMode>
  );
}

// TODO: custom MUI theme

function AppContainer() {
  return <App />;
}
export default AppContainer;
