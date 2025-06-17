"use client";
import * as React from "react";

import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";

export type AgroTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const AgroTextarea = React.forwardRef<HTMLTextAreaElement, AgroTextareaProps>(
  ({ className, name, ...props }, ref) => {
    const { register } = useFormContext();
    return (
      <textarea
        {...register(name!)}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
AgroTextarea.displayName = "AgroTextarea";

export default AgroTextarea;
