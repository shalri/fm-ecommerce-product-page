"use client";
import Image from "next/image";
import { navPages } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import Cart from "./Cart";
import { useState } from "react";
import Nav from "./Nav";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const { itemCount, itemName, itemPrice } = useCart();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleToggleCart = () => {
    setShowCart((prev) => !prev);
    setShowMobileNav(false); // Close mobile nav when opening cart
  };

  const handleToggleMobileNav = () => {
    setShowMobileNav((prev) => !prev);
    setShowCart(false); // Close cart when opening mobile nav
  };
  return (
    <>
      <div
        className={cn(
          showMobileNav &&
            "absolute z-[2] h-full w-full bg-black/10 backdrop-blur-md",
        )}
      />
      <Cart show={showCart} onClose={() => setShowCart(false)} />
      <header className="mb-0 px-6">
        <div className="flex w-full items-center justify-between pb-6 pt-4">
          <div className="flex items-end">
            <button
              className="mr-4 h-4 w-4 bg-[url(/images/icon-menu.svg)] bg-cover bg-no-repeat"
              onClick={handleToggleMobileNav}
            ></button>
            <h2 className="">
              <Image
                src="./images/logo.svg"
                alt="Sneaker logo"
                width={138}
                height={22}
              />
            </h2>
          </div>

          <Nav show={showMobileNav} onClose={() => setShowMobileNav(false)} />

          <div className="flex items-center gap-x-5 pt-1">
            <button
              onClick={handleToggleCart}
              className="relative h-5 w-6 bg-[url(/images/icon-cart.svg)] bg-center bg-no-repeat"
            >
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount === 0 ? "empty" : itemCount}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -right-[4px] -top-[6px] h-[14px] w-5 rounded-full bg-ep-orange text-[.65rem] font-bold text-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src="/images/image-avatar.png"
                alt="User Profile"
                className="object-contain"
                fill
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
