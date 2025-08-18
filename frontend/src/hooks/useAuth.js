import { useState, useEffect } from "react";


export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
      setUser(storedUser);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}
