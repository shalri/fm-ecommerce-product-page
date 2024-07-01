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
        <AnimatePresence>
          <motion.div
            key={images[current].img as string}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=""
          >
            <Image
              src={images[current].img}
              alt={`product image ${current + 1}`}
              width={500}
              height={500}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={prevImage}>Previous</button>
      <button onClick={nextImage}>Next</button>
      <div className="">
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
