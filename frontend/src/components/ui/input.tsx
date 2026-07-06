import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-lg tracking-[0.3em] text-white outline-none transition placeholder:text-slate-500 focus:border-console-accent focus:ring-2 focus:ring-console-accent/30",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };