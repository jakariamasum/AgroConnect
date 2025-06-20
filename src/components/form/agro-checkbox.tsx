/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utils/cn";
import { useCallback } from "react";

interface CheckboxProps {
  name: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  required?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const iconSizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const AgroCheckbox = ({
  name,
  className,
  id,
  disabled,
  size = "sm",
  children,
  required = true,
}: CheckboxProps) => {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const checked = !!watch(name);

  const handleChange = useCallback(() => {
    if (disabled) return;
    setValue(name, !checked);
    trigger(name);
  }, [checked, disabled, name, setValue, trigger]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleChange();
    }
  };

  return (
    <div>
      <div className="flex  items-center gap-2">
        <motion.button
          type="button"
          id={id}
          onClick={handleChange}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          whileTap={{ scale: disabled ? 1 : 0.9 }}
          className={cn(
            "border-2 border-gray-300 rounded flex items-center justify-center transition-all duration-200 outline-none shrink-0",
            sizeMap[size],
            checked && "bg-green-600 border-green-600",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled &&
              "hover:border-green-500 focus:ring-2 focus:ring-green-500",
            className
          )}
          disabled={disabled}
        >
          <input type="hidden" {...register(name)} />
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.1 }}
              >
                <Check className={cn("text-white", iconSizeMap[size])} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {children && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm leading-snug select-none",
              disabled && "opacity-60 cursor-not-allowed"
            )}
            onClick={(e) => {
              e.preventDefault();
              handleChange();
            }}
          >
            {children}

            {required ? (
              <span className="text-red-500 ml-1">*</span>
            ) : (
              <span className="text-gray-400 ml-1">(optional)</span>
            )}
          </label>
        )}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 mt-2">
          {(errors[name] as any).message}
        </p>
      )}
    </div>
  );
};

export default AgroCheckbox;
