import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import type { AuthUser } from "../auth/Auth";

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as AuthUser["role"] | null;

    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await api<{ token: string; role: string }>(
      "/auth/login",
      "POST",
      { email, password }
    );

    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role);

    setUser({ token: res.token, role: res.role as AuthUser["role"] });
  }

  function logout() {
    localStorage.clear();
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
