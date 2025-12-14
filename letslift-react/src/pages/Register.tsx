import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Coach" | "User">("User");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api<void>(
        "/auth/register",
        "POST",
        {
            name,
            email,
            password,
            role,
        }
);


      navigate("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="title">Let’sLift</h1>
      <h3 className="subtitle">Create Account</h3>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleRegister} className="auth-form">
        <input
          className="input-box"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input-box"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input-box"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="input-box"
          value={role}
          onChange={(e) => setRole(e.target.value as "Coach" | "User")}
        >
          <option value="User">User</option>
          <option value="Coach">Coach</option>
        </select>

        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="switch-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Log in</span>
      </p>
    </div>
  );
};

export default Register;
