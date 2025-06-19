"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutDashboard, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

type SidebarItem = {
  name: string;
  href?: string;
  icon: React.ElementType;
  label: string;
  children?: SidebarItem[];
};

interface SidebarProps {
  sidebarItems: SidebarItem[];
  brand?: string;
}

const Sidebar = ({ sidebarItems, brand = "Logo" }: SidebarProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href?: string) => !!href && pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-500 p-2 rounded text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <nav
        className={cn(
          "bg-white  border-r min-h-screen p-4 z-40 transition-all duration-300",
          "fixed md:relative top-0 left-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header with logo & collapse toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-green-600  w-6 h-6" />
            {!collapsed && (
              <span className="text-xl font-bold text-green-600 ">{brand}</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-1 rounded hover:bg-green-100 transition"
          >
            {collapsed ? (
              <ChevronRight className="text-green-600 w-5 h-5" />
            ) : (
              <ChevronLeft className="text-green-600 w-5 h-5" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const active = isActive(item.href);

            if (item.children) {
              return (
                <div key={item.name} className="relative group">
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium group-hover:bg-green-50  transition-all",
                      "text-slate-600 ",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span>{item.label}</span>}
                    {collapsed && (
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* Child links */}
                  {!collapsed && (
                    <div className="ml-6 mt-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href || "#"}
                          className={cn(
                            "block py-1 px-2 text-sm rounded-md",
                            pathname === sub.href
                              ? "text-green-600 font-medium"
                              : "text-slate-500 hover:text-green-600 "
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href || "#"}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium group relative transition-all",
                  active
                    ? "bg-green-100 text-green-600 "
                    : "text-slate-600  hover:bg-green-50 hover:text-green-600 ",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
                {collapsed && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
