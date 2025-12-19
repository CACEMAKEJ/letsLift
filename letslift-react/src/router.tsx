import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CoachDashboard from "./pages/CoachDashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import Bookings from "./pages/Bookings.tsx";
import CreateSession from "./pages/CreateSession.tsx";


export default function AppRouter() {
  const { user } = useAuth();

  return (
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/coach"
          element={
            <ProtectedRoute role="Coach">
              <CoachDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach/create"
          element={
            <ProtectedRoute role="Coach">
              <CreateSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute role="User">
              <Bookings />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}
