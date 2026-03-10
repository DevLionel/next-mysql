"use client";

import { useState } from "react";
import AppContext from "./appContext";          // default import
import type { AppContextType } from "./appContext"; // type import
import type { UserType } from "@/app/types/user";

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [users, setUsers] = useState<UserType[]>([]);

  const refreshUsers = () => {
    console.log("Refreshing users...");
  };

  const value: AppContextType = {
    users,
    setUsers,
    refreshUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}