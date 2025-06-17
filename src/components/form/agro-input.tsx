"use client";

import type React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { forwardRef, useState } from "react";
import { Eye, EyeOffIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface AgroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  name: string;
}

const AgroInput = forwardRef<HTMLInputElement, AgroInputProps>(
  ({ className, label, error, icon, name, type, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const AgroInputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="space-y-1">
        {label && (
          <motion.label
            initial={{ opacity: 0.7 }}
            animate={{ opacity: focused ? 1 : 0.7 }}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            {...register(name)}
            ref={ref}
            type={AgroInputType}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200",
              icon ? "pl-10 pr-10" : isPassword ? "pr-10 pl-3" : "px-3",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <Eye />}
            </button>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600"
          >
            {(errors[name]?.message as string) || ""}
          </motion.p>
        )}
      </div>
    );
  }
);

AgroInput.displayName = "AgroInput";

export default AgroInput;
