"use client";
import { product } from "@/lib/data";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import ProductCarousel from "./ProductCarousel";

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

  const { name, description, price, discount, images } = foundProduct;
  setItemName(name);
  setDynamicPrice(price, discount);
  setItemThumbnail(images[0].thumbnail as string);

  return (
    <main>
      <ProductCarousel images={images} />

      <article className="">
        <h2 className="">brand</h2>
        <h1 className="">{name}</h1>
        <p className="">{description}</p>
        <div className="">
          <p>
            ${itemPrice}
            <span>{discount * 100}%</span>
          </p>
          <p className="line-through">${price}</p>
        </div>

        <div className="flex">
          <button
            onClick={() => setItemCount(itemCount > 0 ? itemCount - 1 : 0)}
          >
            -
          </button>
          <div className="">{itemCount}</div>
          <button onClick={() => setItemCount(itemCount + 1)}>+</button>
        </div>

        <button
          disabled={itemCount > 0}
          className={cn(itemCount > 0 ? "text-gray-700" : "text-blue-300")}
          onClick={() => setItemCount(itemCount === 0 ? itemCount + 1 : 1)}
        >
          {itemCount > 0 ? "Added" : "Add"} to cart
        </button>
      </article>
    </main>
  );
}
