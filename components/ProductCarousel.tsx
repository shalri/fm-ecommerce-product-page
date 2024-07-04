"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import Lightbox from "./Lightbox";
import { useScreenSize } from "@/hooks/useScreenSize";

interface ProductCarouselProps {
  images: {
    img: string | StaticImageData;
    thumbnail: string | StaticImageData;
  }[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const isSmallScreen = useScreenSize();

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handleZoomClick = isSmallScreen
    ? undefined
    : () => setLightboxOpen(!lightboxOpen);

  const thumbnailAnimation = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
      },
    }),
  };

  return (
    <div className="z-10">
      <Lightbox
        lightboxOpen={lightboxOpen}
        images={images}
        currentIndex={current}
        onClose={closeLightbox}
      />
      <div className="relative sm:hover:cursor-zoom-in">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            className="relative h-[300px] min-w-[375px] overflow-hidden bg-ep-orange sm:h-[446px] sm:w-[446px] sm:rounded-[14px]"
            onClick={handleZoomClick}
          >
            <Image
              src={images[current].img}
              alt={`product image ${current + 1}`}
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-[130px] flex w-full justify-between px-4 sm:hidden">
          <button
            className="h-[40px] w-[40px] rounded-full bg-ep-white bg-[url(/fm-ecommerce-product-landing-page/images/icon-previous.svg)] bg-[length:9px_auto] bg-center bg-no-repeat"
            onClick={prevImage}
          ></button>
          <button
            className="h-[40px] w-[40px] rounded-full bg-ep-white bg-[url(/fm-ecommerce-product-landing-page/images/icon-next.svg)] bg-[length:9px_auto] bg-center bg-no-repeat"
            onClick={nextImage}
          ></button>
        </div>
      </div>
      {!lightboxOpen && (
        <div className="mt-8 hidden sm:flex sm:gap-x-8">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                className={cn(
                  " h-[88px] w-[88px] overflow-hidden rounded-md",
                  index === current &&
                    "border-[2px] border-ep-orange transition-opacity duration-300",
                )}
                key={index}
                variants={thumbnailAnimation}
                initial="hidden"
                whileInView="visible"
                custom={index}
              >
                <Image
                  src={image.thumbnail}
                  alt={`thumbnail ${index + 1}`}
                  className={cn(
                    "cursor-pointer",
                    index === current &&
                      "opacity-60 transition-opacity duration-300",
                  )}
                  width={100}
                  height={100}
                  onClick={() => setCurrent(index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
