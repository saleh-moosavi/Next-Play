import { ComponentProps } from "react";

interface IProps extends ComponentProps<"button"> {
  color?: "gray" | "purple" | "orange";
  rounded?: "md" | "lg" | "full";
  width?: "full" | "fit";
  children: string;
}

export default function Button({
  color = "gray",
  rounded = "md",
  width = "fit",
  children,
  ...props
}: IProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 w-${width} text-xs text-white font-semibold cursor-pointer hover:shadow-[0_0_5px_#fff] dark:hover:shadow-[0_0_5px_#000] transition-all duration-300 bg-${color}-600 hover:bg-${color}-700 rounded-${rounded}`}
    >
      {children}
    </button>
  );
}
