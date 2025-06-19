"use client";

import type React from "react";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  className,
  hover = false,
  onClick,
}: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden",
        hover && "cursor-pointer transition-shadow hover:shadow-xl",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-6 pb-4", className)}>{children}</div>;
};

export const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm text-gray-500 mt-1", className)}>{children}</p>
  );
};
