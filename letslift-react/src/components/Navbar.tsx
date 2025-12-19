import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  console.log("Navbar render, user:", user);

  

  function handleLogout() {
    logout();
    navigate("/login");
  }
  
  if (loading) return null;
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Let’s Lift
        </Link>
      </div>

      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user?.role === "Coach" && (
          <>
            <Link to="/coach">Dashboard</Link>
            <Link to="/coach/create">Create Session</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {user?.role === "User" && (
          <>
            <Link to="/bookings">Bookings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
