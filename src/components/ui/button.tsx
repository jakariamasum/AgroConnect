"use client";

import type React from "react";
import { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm";

    const variants = {
      primary:
        "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-500",
      secondary:
        "bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 focus-visible:ring-gray-500",
      outline:
        "border border-green-600 text-green-700 bg-white hover:bg-green-50 active:bg-green-100 focus-visible:ring-green-500",
      ghost:
        "text-gray-700 bg-transparent hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        {...props}
        whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        style={{
          cursor: disabled || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full"
            style={{
              display: "inline-block",
              verticalAlign: "middle",
            }}
            aria-label="Loading"
          />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
