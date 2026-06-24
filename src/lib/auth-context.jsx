"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";

const AuthContext = createContext(null);
const TOKEN_KEY = "medicare_connect_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistSession = useCallback((payload) => {
    setToken(payload.token);
    setUser(payload.user);
    localStorage.setItem(TOKEN_KEY, payload.token);
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    Promise.resolve().then(() => setToken(savedToken));
    apiFetch("/auth/me", { token: savedToken })
      .then((profile) => setUser(profile))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(
    async (credentials) => {
      const payload = await apiFetch("/auth/login", {
        method: "POST",
        body: credentials,
      });
      persistSession(payload);
      toast.success("Welcome back to MediCare Connect");
      return payload;
    },
    [persistSession],
  );

  const register = useCallback(
    async (form) => {
      const payload = await apiFetch("/auth/register", {
        method: "POST",
        body: form,
      });
      persistSession(payload);
      toast.success("Account created successfully");
      return payload;
    },
    [persistSession],
  );

  const googleLogin = useCallback(
    async (role = "patient") => {
      const payload = await apiFetch("/auth/google", {
        method: "POST",
        body: {
          name: "Google Care Member",
          email: `google.${role}@medicare.test`,
          photo:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          role,
        },
      });
      persistSession(payload);
      toast.success("Google sign-in connected");
      return payload;
    },
    [persistSession],
  );

  const updateProfile = useCallback(
    async (updates) => {
      const profile = await apiFetch("/users/me", {
        method: "PATCH",
        token,
        body: updates,
      });
      setUser(profile);
      toast.success("Profile updated");
      return profile;
    },
    [token],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    toast.info("Signed out");
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      googleLogin,
      updateProfile,
      logout,
    }),
    [googleLogin, loading, login, logout, register, token, updateProfile, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ToastContainer position="top-right" theme="colored" />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}