"use client";
import { navPages } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useClickOutside } from "@/hooks/useClickOutside";

interface NavProps {
  show: boolean;
  onClose: () => void;
}

export default function Nav({ show, onClose }: NavProps) {
  const isSmallScreen = useScreenSize();
  const navRef = useClickOutside(onClose);

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
        className="mb-[52px] h-4 w-4 cursor-pointer bg-[url(/images/icon-close.svg)] bg-no-repeat sm:hidden"
        onClick={() => onClose()}
      ></li>
      {navPages.map((page) => (
        <li
          key={page.page}
          className="underline-hover transition-color pb-[19px] text-[1.08rem] font-bold text-ep-very-dark-blue duration-300 hover:text-ep-orange sm:pb-0 sm:text-sm sm:font-normal sm:text-ep-dark-grayish-blue sm:hover:text-ep-very-dark-blue"
        >
          <a href={page.url} onClick={onClose}>
            {page.page}
          </a>
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
