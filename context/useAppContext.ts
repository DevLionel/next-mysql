"use client";

import { useContext } from "react";
import AppContext from "./appContext";
import type { AppContextType } from "./appContext";

export default function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside an AppProvider");
  }

  return context;
}