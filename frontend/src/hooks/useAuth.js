import { useState, useEffect } from "react";

/**
 * useAuth - Custom hook to manage authentication state using localStorage.
 * Returns: { user, login, logout }
 */
export default function useAuth() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
    setUser(storedUser);
  }, []);

  // Listen for changes to localStorage (e.g., login/logout from other tabs)
  useEffect(() => {
    const handleStorage = () => {
      const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
      setUser(storedUser);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Login: Save user to localStorage and update state
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout: Remove user from localStorage and update state
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}
