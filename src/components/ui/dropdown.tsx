"use client";

import { ReactNode, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";

export const DropdownMenu = ({ children }: { children: ReactNode }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

export const DropdownMenuTrigger = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium shadow-sm bg-white border border-green-300 hover:bg-green-50"
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({
  children,
  isOpen,
  onClose,
  align = "start",
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  align?: "start" | "end";
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 mt-2 w-48 border border-green-300 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
        align === "end" ? "right-0" : "left-0"
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-900"
    >
      {children}
    </button>
  );
};
export const DropdownMenuSeparator = () => {
  return <div className="border-t border-gray-200 my-1" />;
};
