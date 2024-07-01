import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
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
    <aside
      ref={cartRef}
      className={cn(
        "absolute inset-0 bottom-0 left-4 right-4 top-16 z-20 block max-h-[40dvh] bg-white",
        show ? "block" : "hidden",
      )}
    >
      <h2 className="">Cart</h2>
      {itemCount === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <h3 className="">{itemName}</h3>
          <Image
            src={itemThumbnail}
            alt={`${itemName} thumbnail`}
            width={50}
            height={50}
          />
          <p className="">
            ${itemPrice} + {itemCount} <strong>{total}</strong>
          </p>
          <button onClick={handleClearCart}>Clear Cart</button>
        </>
      )}
    </aside>
  );
}
