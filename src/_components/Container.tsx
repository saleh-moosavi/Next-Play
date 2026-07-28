import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "purple" | "blue" | "white";
}

export default function Container({
  children,
  className = "",
  variant = "default",
}: ContainerProps) {
  const variantStyles = {
    default: `
      flex flex-col justify-center items-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900
      dark:from-gray-100 dark:via-gray-50 dark:to-gray-100 mx-5 lg:mx-0 min-h-[80vh]
    `,
    purple: `
      bg-linear-to-br from-pink-900/20 to-purple-900/20
      dark:from-pink-100/30 dark:to-purple-100/30
      border border-pink-500/20
      dark:border-pink-300/30
      shadow-lg shadow-pink-500/10
    `,
    blue: `
      bg-linear-to-br from-sky-900/20 to-blue-900/20
      dark:from-sky-100/30 dark:to-blue-100/30
      border border-sky-500/20
      dark:border-sky-300/30
      shadow-lg shadow-sky-500/10
    `,
    white: `
      bg-linear-to-br from-white/20 to-gray-700/20
      dark:from-gray-500/30 dark:to-gray-300/30
      border border-white/20
      dark:border-gray-500/30
      shadow-lg shadow-white/10
    `,
  };

  return (
    <section
      className={twMerge(
        variantStyles[variant],
        "w-full text-gray-100 dark:text-gray-900 p-5 rounded-xl transition-all duration-300",

        className,
      )}
    >
      {children}
    </section>
  );
}
