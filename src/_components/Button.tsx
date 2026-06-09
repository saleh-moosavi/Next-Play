import { ComponentProps } from "react";

interface IProps extends ComponentProps<"button"> {
  color?: "gray" | "purple" | "orange";
  rounded?: "none" | "md" | "lg" | "full";
  width?: "full" | "fit";
  children: string;
}

export default function Button({
  color = "gray",
  rounded = "none",
  width = "fit",
  children,
  ...props
}: IProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 w-${width} text-xs text-white font-semibold cursor-pointer shadow-inner hover:shadow-white dark:hover:shadow-black transition-all duration-300 bg-${color}-600 rounded-${rounded}`}
    >
      {children}
    </button>
  );
}
