import * as React from "react";

import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  file?: File | null;
  setFile?: Function;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, file, setFile, label, ...props }, ref) => {
    if (type === "file" && setFile) {
      const id = uuid();
      return (
        <div
          className={cn(
            "cursor-pointer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <label
            htmlFor={id}
            className="flex items-center gap-[10px] w-full text-center cursor-pointer"
          >
            <span className={cn(file ? "w-[50%]" : "w-full")}>
              {label || "Choose image"}
            </span>
            <div
              className={cn(
                "flex items-center gap-[10px] overflow-hidden",
                !file ? "w-[0%]" : "w-full",
              )}
            >
              <span
                className={cn(
                  "block w-[10px] h-[10px] rounded-[10px]",
                  file && "bg-green-600",
                )}
              ></span>
              <span className="inline-block text-nowrap w-[50px]">
                {file && file.name}
              </span>
            </div>
          </label>
          <input
            type={type}
            ref={ref}
            {...props}
            onChange={(event) => {
              setFile(
                event.currentTarget.files ? event.currentTarget.files[0] : null,
              );
            }}
            id={id}
            hidden
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
