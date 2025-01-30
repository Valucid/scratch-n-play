import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
// import ScratchGame from "./Pages/ScratchGame";
import Layout from "./components/Layout";
import Login from "./Pages/Login";
import Terms from "./Pages/Terms";
import { useAppSelector } from "./redux/hooks";
import Preloader from "./components/Preloader";

const ScratchGame = lazy(() => import("./Pages/ScratchGame"));

const PrivateRoute = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/scratch-game" element={<PrivateRoute />}>
            <Route
              index
              element={
                <Suspense fallback={<Preloader />}>
                  <ScratchGame />
                </Suspense>
              }
            />
          </Route>
          <Route path="/terms" element={<Terms />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
