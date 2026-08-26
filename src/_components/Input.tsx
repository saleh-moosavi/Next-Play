import { ComponentProps, forwardRef } from "react";

interface IProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label
          htmlFor={props.id}
          className="text-sm text-gray-400 dark:text-gray-900"
        >
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          className={`
            w-full text-xs px-4 py-3 
            bg-gray-900 dark:bg-gray-200 
            border 
            ${error ? "border-red-500" : "border-transparent"} 
            focus:border-orange-600 
            rounded-md 
            dark:placeholder:text-gray-500 
            text-gray-100 
            focus:outline-none
            transition-colors
          `}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
