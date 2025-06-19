"use client";

import { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layouts/sidebar";
import { farmerSidebar } from "@/constants";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div
      className={cn(
        "flex min-h-screen bg-gray-50  text-gray-900  transition-colors duration-300"
      )}
    >
      <Sidebar sidebarItems={farmerSidebar} brand="Farmer" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        <main className="flex-1 p-4 md:p-8 bg-gray-50  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
