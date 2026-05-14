"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { api } from "@/lib/api";
import { clearUserReducer, setUserReducer } from "@/redux/slices/user.slice";

type AuthContextType = {
  loading: boolean;
  authenticated: boolean;

  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: true,
  authenticated: false,

  refreshUser: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.user);

  const [loading, setLoading] = useState(true);

  // refresh user
  const refreshUser = async () => {
    try {
      const res = await api.get("/api/profile");

      dispatch(setUserReducer(res.data));
    } catch {
      dispatch(clearUserReducer());
    }
  };

  // logout
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      dispatch(clearUserReducer());
    }
  };

  useEffect(() => {
    const init = async () => {
      await refreshUser();
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
