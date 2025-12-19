import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { decodeJwt } from "../utils/jwt";
import type { AuthUser } from "../auth/Auth";

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function extractRole(payload: any): AuthUser["role"] | null {
  return (
    payload.role ??
    payload.roles ??
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
    null
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const payload = decodeJwt(token);
    const role = extractRole(payload);

    if (role) {
      setUser({ token, role });
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await api<{ token: string }>(
      "/auth/login",
      "POST",
      { email, password }
    );

    const payload = decodeJwt(res.token);
    const role = extractRole(payload);

    if (!role) {
      throw new Error("Role missing in token");
    }

    localStorage.setItem("jwt", res.token);
    localStorage.setItem("role", role);

    setUser({ token: res.token, role });
  }

  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
}
