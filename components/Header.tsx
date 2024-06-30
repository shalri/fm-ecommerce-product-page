"use client";
import Image from "next/image";
import { navPages } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import Cart from "./Cart";
import { useState } from "react";
import Nav from "./Nav";
import { cn } from "@/lib/utils";

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
      <Cart show={showCart} onClose={() => setShowCart(false)} />
      <header className="mb-6 w-full bg-zinc-200 py-3">
        <div className="flex items-center justify-between">
          <div className="flex">
            <button
              className="h-4 w-4 bg-[url(/images/icon-menu.svg)] bg-cover bg-no-repeat"
              // onClick={() => setShowMobileNav(!showMobileNav)}
              onClick={handleToggleMobileNav}
            ></button>
            <h2 className="">
              <Image
                src="./images/logo.svg"
                alt="Sneaker logo"
                width={100}
                height={50}
              />
            </h2>
          </div>

          {/* <div className={cn("hidden")}> */}
          <Nav show={showMobileNav} onClose={() => setShowMobileNav(false)} />
          {/* <nav className=""> */}
          {/*   <ul className="flex"> */}
          {/*     {navPages.map((page) => ( */}
          {/*       <li className="" key={page.page}> */}
          {/*         <a href={page.url}>{page.page}</a> */}
          {/*       </li> */}
          {/*     ))} */}
          {/*   </ul> */}
          {/* </nav> */}
          {/* </div> */}

          <div className="flex items-center gap-x-10">
            <button
              // onClick={() => setShowCart(!showCart)}
              onClick={handleToggleCart}
              className="relative h-5 w-6 bg-[url(/images/icon-cart.svg)] bg-center bg-no-repeat"
            >
              <span className="absolute top-0 h-4 w-6 rounded-full bg-ep-orange text-[.65rem] font-bold text-white">
                {itemCount}
              </span>
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
