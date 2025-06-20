"use client";
import * as React from "react";

import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";

export type AgroTextareaProps = {
  name?: string;
  className?: string;
};

const AgroTextarea = ({ className, name, ...props }: AgroTextareaProps) => {
  const { register } = useFormContext();
  return (
    <textarea
      {...register(name!)}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

export default AgroTextarea;
