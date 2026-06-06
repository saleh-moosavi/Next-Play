import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractGameUrl = (url: string): string => {
  try {
    const urlWithoutProtocol = url.replace(/^https?:\/\//i, "");
    const pathname = urlWithoutProtocol.split("/").slice(1).join("/");

    const parts = pathname.split("/").filter((part) => part.length > 0);

    if (parts.length >= 2) {
      const id = parts[0];
      const slug = parts.slice(1).join("/");
      const fullSlug = `${id}/${slug}`;

      return fullSlug;
    }
    return "";
  } catch (error) {
    console.error("خطا در استخراج اطلاعات از URL:", error);
    return "";
  }
};
