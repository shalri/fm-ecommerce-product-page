"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  images: {
    img: string | StaticImageData;
    thumbnail: string | StaticImageData;
  }[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="z-10">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            className="relative h-[300px] min-w-[375px] overflow-hidden bg-ep-orange"
          >
            <Image
              src={images[current].img}
              alt={`product image ${current + 1}`}
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-[130px] flex w-full justify-between px-4">
          <button
            className="h-[40px] w-[40px] rounded-full bg-ep-white bg-[url(/images/icon-previous.svg)] bg-[length:9px_auto] bg-center bg-no-repeat"
            onClick={prevImage}
          ></button>
          <button
            className="h-[40px] w-[40px] rounded-full bg-ep-white bg-[url(/images/icon-next.svg)] bg-[length:9px_auto] bg-center bg-no-repeat"
            onClick={nextImage}
          ></button>
        </div>
      </div>
      <div className="hidden sm:flex">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.thumbnail}
            alt={`thumbnail ${index + 1}`}
            className={cn("rounded-md", index === current && "opacity-80")}
            width={100}
            height={100}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
