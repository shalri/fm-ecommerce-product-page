// Lightbox.tsx
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Make sure cn utility is imported
import { useClickOutside } from "@/hooks/useClickOutside";

interface LightboxProps {
  lightboxOpen: boolean;
  images: {
    img: string | StaticImageData;
    thumbnail: string | StaticImageData;
  }[];
  currentIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  lightboxOpen,
  images,
  currentIndex,
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(currentIndex); // State for current index
  const lightboxRef = useClickOutside(onClose);

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const closeLightbox = () => {
    onClose(); // Call onClose prop to close the lightbox
  };

  // Handle clicking on thumbnails to update current image
  const handleThumbnailClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/90"
        >
          <div ref={lightboxRef}>
            <div className="group relative">
              <div
                className="mb-6 w-full cursor-pointer text-right text-4xl text-ep-white hover:text-ep-orange"
                onClick={closeLightbox}
              >
                x
              </div>
              <div className="w-550px h-[550px] overflow-hidden rounded-[14px] bg-ep-orange">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: 1,
                      rotateY: 360,
                      transition: { duration: 0.5 },
                    }}
                    exit={{ opacity: 0.3 }}
                    className="relative h-[550px] w-[550px]"
                  >
                    <Image
                      src={images[current].img}
                      alt={`product image ${currentIndex + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute top-[300px] flex w-full justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  className="-ml-5 h-[40px] w-[40px] rounded-full bg-ep-white bg-[url(/fm-ecommerce-product-landing-page/images/icon-previous.svg)] bg-[length:9px_auto] bg-center bg-no-repeat"
                  onClick={() => prevImage()} // Define prevImage function
                ></button>
                <button
                  className="-mr-5 h-[40px] w-[40px] rounded-full bg-ep-white bg-[url(/fm-ecommerce-product-landing-page/images/icon-next.svg)] bg-[length:9px_auto] bg-center bg-no-repeat"
                  onClick={nextImage} // Define nextImage function
                ></button>
              </div>
            </div>
            <div className="mt-8 hidden sm:flex sm:justify-center sm:gap-x-8">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image.thumbnail}
                  alt={`thumbnail ${index + 1}`}
                  className={cn(
                    "z-40 h-[88px] w-[88px] cursor-pointer rounded-md",
                    index === current &&
                      "cursor-auto border-[2px] border-ep-orange opacity-60 transition-opacity duration-300",
                  )}
                  width={100}
                  height={100}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
