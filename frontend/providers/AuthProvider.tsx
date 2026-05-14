"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { api } from "@/lib/api";
import { clearUserReducer, setUserReducer } from "@/redux/slices/user.slice";
import { useDispatch } from "react-redux";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  authenticated: boolean;

  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authenticated: false,

  refreshUser: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  // Récupère l'utilisateur connecté
  const refreshUser = async () => {
    try {
      const res = await api.get("/api/user");

      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/profile");

        dispatch(setUserReducer(res.data));
      } catch {
        dispatch(clearUserReducer());
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated: !!user,

        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
