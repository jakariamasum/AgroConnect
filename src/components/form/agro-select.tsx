/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utils/cn";

interface AgroSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  count?: number; // Optional count for displaying in the dropdown
}

interface AgroSelectProps {
  name: string;
  options: AgroSelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const AgroSelect = ({
  name,
  options,
  placeholder = "Select option",
  className,
  disabled,
}: AgroSelectProps) => {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const selectedOption = options.find((opt) => opt.value === value) || null;
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: AgroSelectOption) => {
    if (option.disabled) return;
    setValue(name, option.value);
    trigger(name);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={cn("relative w-full", className)} ref={selectRef}>
      <input type="hidden" {...register(name)} />

      <motion.button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={cn(
          "w-full px-3 py-2 text-left bg-white border rounded-lg transition-all duration-200 outline-none text-sm sm:text-base",
          errors[name]
            ? "border-red-500 ring-2 ring-red-200"
            : "border-gray-300 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500",
          disabled && "opacity-50 cursor-not-allowed",
          isOpen && "ring-2 ring-green-500 border-green-400 shadow-md"
        )}
        disabled={disabled}
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "flex items-center gap-2 text-gray-800",
              !selectedOption && "text-gray-400 italic font-light"
            )}
          >
            {selectedOption ? (
              <>
                <span className="truncate">{selectedOption.label}</span>
                {selectedOption.count !== undefined && (
                  <span className="text-gray-500 font-normal">
                    ({selectedOption.count})
                  </span>
                )}
              </>
            ) : (
              placeholder
            )}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent text-sm sm:text-base"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                whileHover={{
                  backgroundColor: option.disabled ? undefined : "#e6f4ea",
                }}
                className={cn(
                  "w-full px-3 py-2 text-left flex items-center justify-between transition-colors duration-100",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  value === option.value
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "hover:bg-green-50",
                  !option.disabled && "cursor-pointer"
                )}
                disabled={option.disabled}
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </motion.button>
            ))}
            {options.length > 6 && (
              <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {errors[name] && (
        <p className="text-sm text-red-600 mt-1">
          {(errors[name] as any).message}
        </p>
      )}
    </div>
  );
};

export default AgroSelect;
