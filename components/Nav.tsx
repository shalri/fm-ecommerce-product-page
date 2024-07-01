"use client";
import { navPages } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface NavProps {
  show: boolean;
  onClose: () => void;
}

export default function Nav({ show, onClose }: NavProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutsideNav = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", checkScreenSize);
    document.addEventListener("click", handleClickOutsideNav);
    checkScreenSize();

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      document.removeEventListener("click", handleClickOutsideNav);
    };
  }, [onClose]);

  const navContent = (
    <ul
      className={cn(
        isSmallScreen
          ? "absolute left-0 top-0 flex h-full w-[50dvw] flex-col justify-start bg-green-300"
          : "hidden sm:flex sm:flex-row",
      )}
    >
      <li className="sm:hidden" onClick={() => onClose()}>
        x
      </li>
      {navPages.map((page) => (
        <li key={page.page}>
          <a href={page.url}>{page.page}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      className={cn("hidden bg-white sm:flex", show && "block")}
      ref={navRef}
    >
      {isSmallScreen ? navContent : navContent}
    </nav>
  );
}
