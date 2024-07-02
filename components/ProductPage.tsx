"use client";
import { product } from "@/lib/data";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import ProductCarousel from "./ProductCarousel";
import { AnimatePresence, motion } from "framer-motion";

interface ProductPageProps {
  itemName: string;
}

export default function ProductPage({ itemName }: ProductPageProps) {
  const foundProduct = product.find(
    (item) => item.name.toLowerCase() === itemName.toLowerCase(),
  );

  const {
    itemCount,
    setItemCount,
    setItemName,
    itemPrice,
    setDynamicPrice,
    setItemThumbnail,
  } = useCart();

  if (!foundProduct) {
    return <p>Product not found</p>;
  }

  const { brand, name, description, price, discount, images } = foundProduct;
  setItemName(name);
  setDynamicPrice(price, discount);
  setItemThumbnail(images[0].thumbnail as string);

  return (
    <main>
      <ProductCarousel images={images} />

      <article className="mt-6 px-6">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-[.125rem] text-ep-dark-grayish-blue">
          {brand}
        </h2>
        <h1 className="text-[1.75rem] font-bold leading-tight text-ep-very-dark-blue">
          {name}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ep-dark-grayish-blue">
          {description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-[1.75rem] font-bold tracking-wide text-ep-very-dark-blue">
            ${itemPrice}
            <span className="ml-5 rounded-md bg-ep-very-dark-blue px-2 py-1 text-base text-ep-white">
              {discount * 100}%
            </span>
          </p>
          <p className="font-bold tracking-wide text-ep-dark-grayish-blue line-through">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="mt-6 flex h-[55px] items-center justify-between rounded-md bg-ep-light-grayish-blue">
          <button
            onClick={() => setItemCount(itemCount > 0 ? itemCount - 1 : 0)}
            className="h-[50px]  w-16 bg-[url(/images/icon-minus.svg)] bg-center bg-no-repeat"
          ></button>
          <div className="font-bold text-ep-very-dark-blue">{itemCount}</div>
          <button
            onClick={() => setItemCount(itemCount + 1)}
            className="h-[50px]  w-16 bg-[url(/images/icon-plus.svg)] bg-center bg-no-repeat"
          ></button>
        </div>

        <button
          disabled={itemCount > 0}
          className={cn(
            "transition-color mt-4 h-[55px] w-full rounded-md duration-300",
            itemCount > 0
              ? "bg-ep-orange/60 text-ep-very-dark-blue/40"
              : "bg-ep-orange text-ep-very-dark-blue",
          )}
          onClick={() => setItemCount(itemCount === 0 ? itemCount + 1 : 1)}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={itemCount === 0 ? "non-active" : "active"}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.1,
                },
              }}
              exit={{ opacity: 0 }}
              className="bg-[url(/images/icon-cart.svg)] bg-no-repeat pl-10 font-bold "
            >
              {itemCount > 0 ? "Added" : "Add"} to cart
            </motion.span>
          </AnimatePresence>
        </button>
      </article>
    </main>
  );
}
