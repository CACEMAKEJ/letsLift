import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CoachDashboard from "./pages/CoachDashboard.tsx";


export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/coach"
          element={
            user?.role === "Coach" ? <CoachDashboard /> : <Navigate to="/login" />
          }
        />

       
      </Routes>
    </BrowserRouter>
  );
}
