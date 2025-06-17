"use client";

import { createContext, useContext } from "react";

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("useTabsContext must be used within a TabsProvider");
  return context;
}
