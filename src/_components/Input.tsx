import { ComponentProps } from "react";

interface IProps extends ComponentProps<"input"> {
  label: string;
}

export default function Input({ label, ...props }: IProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor="username"
        className="text-sm text-gray-400 dark:text-gray-900"
      >
        {label}
      </label>
      <input
        {...props}
        className="w-full text-xs px-4 py-3 bg-gray-900 dark:bg-gray-200 border border-transparent focus:border-orange-600 rounded-md dark:placeholder:text-gray-500 text-gray-100 focus:outline-none"
      />
    </div>
  );
}
