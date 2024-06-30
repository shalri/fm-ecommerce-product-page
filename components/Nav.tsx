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
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutsideNav = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        // setIsMobileNavActive(false);
        onClose();
      }
    };
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    window.addEventListener("resize", checkScreenSize);
    document.addEventListener("click", handleClickOutsideNav);
    checkScreenSize();

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      document.removeEventListener("click", handleClickOutsideNav);
    };
    // }, [isMobileNavActive]);
  }, [onClose]);

  const navContent = (
    <ul className={cn()}>
      {navPages.map((page) => (
        <li className="" key={page.page}>
          <a href={page.url}>{page.page}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <nav className={cn("bg-white", show ? "block" : "hidden")} ref={navRef}>
      {navContent}
    </nav>
  );
}
