import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import { api } from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"User" | "Coach">("User");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api(
        "/auth/register",
        "POST",
        { name, email, password, role }
      );

      navigate("/login");
    } catch {
      setError("Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer
      title="Let’s Lift"
      subtitle="Create your account"
    >
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleRegister} className="auth-form">
        <input
          className="auth-input"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <select
          className="auth-input"
          value={role}
          onChange={e => setRole(e.target.value as "User" | "Coach")}
        >
          <option value="User">User</option>
          <option value="Coach">Coach</option>
        </select>

        <button className="auth-button" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="auth-switch">
        Already registered?{" "}
        <span onClick={() => navigate("/login")}>
          Sign in
        </span>
      </p>
    </AuthContainer>
  );
}
