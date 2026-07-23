"use client";

import { FaSpinner } from "react-icons/fa";

export default function LoadingPage() {
    throw new Error("sd");
    
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-2">
      <FaSpinner className="animate-spin size-10" />
      <p>در حال بارگذاری</p>
    </div>
  );
}
