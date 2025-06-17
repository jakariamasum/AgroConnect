import { Header } from "@/components/header";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-6 sm:px-8 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
