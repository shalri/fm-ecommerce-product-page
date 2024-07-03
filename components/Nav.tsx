"use client";
import { navPages } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";

interface NavProps {
  show: boolean;
  onClose: () => void;
}

export default function Nav({ show, onClose }: NavProps) {
  const isSmallScreen = useScreenSize();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutsideNav = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutsideNav);

    return () => {
      document.removeEventListener("click", handleClickOutsideNav);
    };
  }, [onClose]);

  const animateNavWrapper = (children: ReactNode) => (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mobileNav"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 1 }}
          exit={{ opacity: 0, x: -100 }}
          className="absolute -left-[2px] top-0 flex h-full w-[67dvw] flex-col justify-start bg-ep-white p-6"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const navContent = (
    <ul
      className={cn(
        isSmallScreen
          ? "flex h-full w-[67dvw] flex-col justify-start"
          : "hidden sm:flex sm:flex-row sm:gap-x-[34px] sm:tracking-[0.0275rem]",
      )}
    >
      <li
        className="mb-[52px] h-4 w-4 bg-[url(/images/icon-close.svg)] bg-no-repeat sm:hidden"
        onClick={() => onClose()}
      ></li>
      {navPages.map((page) => (
        <li
          key={page.page}
          className="pb-[19px] text-[1.08rem] font-bold text-ep-very-dark-blue sm:pb-0 sm:text-sm sm:font-normal"
        >
          <a href={page.url}>{page.page}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      className={cn("z-10 hidden bg-white sm:ml-14 sm:flex", show && "block")}
      ref={navRef}
    >
      {isSmallScreen ? animateNavWrapper(navContent) : navContent}
    </nav>
  );
}
