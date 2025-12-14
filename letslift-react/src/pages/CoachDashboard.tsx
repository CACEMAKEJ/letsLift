import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Booking } from "../types/Booking";
import { useNavigate } from "react-router-dom";

export default function CoachDashboard() {
  const [sessions, setSessions] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Booking[]>("/bookings/coach")
      .then(res => setSessions(res.data))
      .catch(() => alert("Failed to load sessions"));
  }, []);

  return (
    <div className="page">
      <h1>Your Sessions</h1>

      <button className="primary-btn" onClick={() => navigate("/create-session")}>
        + Create Session
      </button>

      {sessions.length === 0 && <p>No sessions yet.</p>}

      {sessions.map(s => (
        <div key={s.id} className="card">
          <h3>{new Date(s.startTime).toLocaleString()}</h3>
          <p>{s.description}</p>

          {s.bookedByUserName ? (
            <span className="badge booked">
              Booked by {s.bookedByUserName}
            </span>
          ) : (
            <span className="badge open">Available</span>
          )}
        </div>
      ))}
    </div>
  );
}
