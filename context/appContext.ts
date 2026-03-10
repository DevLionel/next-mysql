"use client";

import { createContext } from "react";
import type { UserType } from "@/app/types/user";

// Define the shape of your context
export type AppContextType = {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  refreshUsers: () => void;
};

// Create context object (value, not type)
const AppContext = createContext<AppContextType | undefined>(undefined);

// Default export is the **context object**
export default AppContext;