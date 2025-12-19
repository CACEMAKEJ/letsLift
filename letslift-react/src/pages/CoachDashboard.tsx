import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../auth/AuthContext";

type BookingDto = {
  id: string;
  startTime: string;
  description: string;
  bookedByUserName?: string | null;
};

export default function CoachDashboard() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [sessions, setSessions] = useState<BookingDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const data = await api<BookingDto[]>("/bookings/coach", "GET", undefined, user!.token);
      setSessions(data);
    } catch {
      setError("Failed to load sessions");
    }
  }

  async function deleteSession(id: string) {
    await api(`/bookings/${id}`, "DELETE", undefined, user!.token);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page">
      <h2>Coach Dashboard</h2>

      <button onClick={() => nav("/coach/create")}>
        + Create Session
      </button>

      {error && <p>{error}</p>}

      {sessions.map((s) => (
        <div className="card" key={s.id}>
          <div>{new Date(s.startTime).toLocaleString()}</div>
          <div>{s.description}</div>
          <div>
            {s.bookedByUserName ? `Booked by: ${s.bookedByUserName}` : "Available"}
          </div>

          <button onClick={() => deleteSession(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
