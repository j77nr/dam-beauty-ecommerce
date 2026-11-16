import { createContext, useContext, useState, useEffect, ReactNode } from "react";
interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.success) setUser(data.user); else setUser(null);
      } else setUser(null);
    } catch { setUser(null); } finally { setLoading(false); }
  };
  useEffect(() => { fetchUser(); }, []);
  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Erreur de connexion");
    setUser(data.user);
  };
  const register = async (data: any) => {
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const d = await res.json();
    if (!d.success) throw new Error(d.error || "Erreur inscription");
    setUser(d.user);
  };
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); };
  return (<AuthContext.Provider value={{ user, loading, login, register, logout, refetch: fetchUser }}>{children}</AuthContext.Provider>);
}
export function useAuth() { const c = useContext(AuthContext); if (!c) throw new Error("useAuth dans AuthProvider"); return c; }