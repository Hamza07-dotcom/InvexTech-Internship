// src/providers/ReduxProvider.jsx
"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useEffect } from "react";
import { setUser } from "@/features/auth/authSlice";

/**
 * Wraps the app in a client-side Provider and hydrates auth from localStorage
 */
export default function ReduxProvider({ children }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) store.dispatch(setUser(JSON.parse(raw)));
    } catch (e) {
      // ignore
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
