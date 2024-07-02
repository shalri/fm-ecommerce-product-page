import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
interface CartProps {
  show: boolean;
  onClose: () => void;
}

export default function Cart({ show, onClose }: CartProps) {
  const { itemCount, itemName, itemPrice, itemThumbnail, clearCart } =
    useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const total = (parseFloat(itemPrice) * itemCount).toFixed(2);

  useEffect(() => {
    const handleClickOutsideCart = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutsideCart);

    return () => {
      document.removeEventListener("click", handleClickOutsideCart);
    };
  }, [onClose]);

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          key="cart"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          ref={cartRef}
          className={cn(
            "absolute inset-0 bottom-0 left-2 right-2 top-[76px] z-20 block max-h-[256px] rounded-[8px] bg-white py-4",
          )}
        >
          <h2 className="border-b border-ep-light-grayish-blue px-6 pb-6 pt-1 font-bold">
            Cart
          </h2>
          {itemCount === 0 ? (
            <div className="flex items-center justify-center px-6 pt-6">
              <p className="mt-10 font-bold text-ep-dark-grayish-blue">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between">
                <Image
                  src={itemThumbnail}
                  alt={`${itemName} thumbnail`}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <h3 className="text-ep-dark-grayish-blue">{itemName}</h3>
                  <p className="text-ep-dark-grayish-blue">
                    ${itemPrice}&nbsp;&nbsp;x&nbsp;&nbsp;{itemCount}&nbsp;&nbsp;
                    <strong className="text-ep-black">${total}</strong>
                  </p>
                </div>
                <button
                  onClick={handleClearCart}
                  className="h-4 w-4 bg-[url(/images/icon-delete.svg)] bg-center bg-no-repeat"
                ></button>
              </div>
              <a
                className="transition-color mt-6 block w-full rounded-[8px] bg-ep-orange px-6 py-4 text-center font-bold duration-300 hover:bg-ep-orange/80"
                href="#"
              >
                Checkout
              </a>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
