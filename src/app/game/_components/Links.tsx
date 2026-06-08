"use client";

import { useState } from "react";
import { GameVersion } from "@/types/gamePageTypes";
import { HiDownload, HiChevronUp } from "react-icons/hi";

export default function Links({ versions }: { versions: GameVersion[] }) {
  const [activeVersion, setActiveVersion] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!versions || versions.length === 0) {
    return null;
  }

  const currentVersion = versions[activeVersion];

  return (
    <div className="bg-gray-700 dark:bg-white rounded-xl shadow-lg overflow-hidden p-5 space-y-5">
      <h2 className="text-xl font-bold">لینک‌های دانلود</h2>

      {versions.length > 0 && (
        <div className="relative mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-100 rounded-lg cursor-pointer transition-all duration-300 border-none outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {currentVersion.title || ""} - {currentVersion.size || ""}
              </span>
            </div>
            <HiChevronUp
              className={`size-5 transition-all duration-300 ${isOpen ? "" : "rotate-180"}`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full md:w-80 bg-gray-800 dark:bg-gray-100 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {versions.map((version, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveVersion(index);
                    setIsOpen(false);
                  }}
                  className={`w-full flex justify-between items-center text-right text-sm px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-200 transition cursor-pointer ${
                    activeVersion === index
                      ? "bg-blue-500 dark:bg-blue-100"
                      : ""
                  }`}
                >
                  <span className="truncate flex-1">{version.title}</span>
                  {version.size && (
                    <span className="shrink-0">
                      {version.size.replace("حجم فایل ها : ", "")}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid gap-3">
        {currentVersion.links.map((link, index) => {
          if (link.noLink) {
            return (
              <div
                key={"NoLinkBtn" + index}
                className="flex items-center gap-2 text-sm text-justify px-4 py-2 bg-gray-800 dark:bg-gray-100 rounded-lg w-fit"
              >
                <span>{link.text}</span>
              </div>
            );
          }

          return (
            <a
              key={"LinkBtn" + index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-100 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-200 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HiDownload className="size-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{link.text}</p>
                  {link.size && <p className="text-sm">{link.size}</p>}
                </div>
              </div>
              <span className="text-white text-sm bg-blue-500 px-4 py-2 rounded-lg">
                دانلود
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
