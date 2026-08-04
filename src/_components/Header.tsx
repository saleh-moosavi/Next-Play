"use client";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import useDarkMode from "@/store/useDarkMode";

const menuItems = [
  { title: "تریلر ها", href: "/trailer/all" },
  { title: "بازی های اندروید", href: "/mobile/all" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
];

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [sidebar, setSidebar] = useState(false);

  const sidebarChange = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return () => {
      document.documentElement.classList.add("dark");
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebar]);

  return (
    <>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        menuItems={menuItems}
      />
      <Sidebar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        sidebar={sidebar}
        sidebarChange={sidebarChange}
        menuItems={menuItems}
      />
    </>
  );
}
