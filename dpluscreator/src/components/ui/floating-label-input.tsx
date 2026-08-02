import * as React from "react";
import { Input } from "@/components/ui/input"; // Import your existing input
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps extends React.ComponentProps<"input"> {
  label: string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, id, ...props }, ref) => {
    // Generate a unique ID if one isn't provided, needed for the label-input connection
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="relative">
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            // Base styles
            "peer block w-full px-3 py-1 pt-5 pb-2 text-base md:text-sm",
            // Hide standard placeholder so our label can take its place
            "placeholder:text-transparent focus:placeholder:text-transparent",
            className
          )}
          placeholder=" " // Required for the :placeholder-shown pseudo-class to work
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            // Positioning & Layout
            "absolute left-3 top-3 z-10 origin-[0]",
            "cursor-text select-none px-1",
            
            // Text Styling (starts as placeholder look)
            "text-muted-foreground ",
            
            // Transitions
            "transition-all duration-200 ease-out",

            // STATE: Placeholder Shown (Input is empty & not focused) -> Position inside
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",

            // STATE: Focus or Has Value -> Position on top border
            "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-brand-primary bg-white",
            
            // Handle when input has value (not placeholder-shown)
            "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-75"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };