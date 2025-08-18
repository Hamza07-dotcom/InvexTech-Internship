"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useEffect } from "react";
import { setUser } from "@/features/auth/authSlice";

export default function ReduxProvider({ children }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) store.dispatch(setUser(JSON.parse(raw)));
    } catch (e) {
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
