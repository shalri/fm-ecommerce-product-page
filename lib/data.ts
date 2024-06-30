import img1 from "../public/images/image-product-1.jpg";
import img1Thumb from "../public/images/image-product-1-thumbnail.jpg";
import img2 from "../public/images/image-product-2.jpg";
import img2Thumb from "../public/images/image-product-2-thumbnail.jpg";
import img3 from "../public/images/image-product-3.jpg";
import img3Thumb from "../public/images/image-product-3-thumbnail.jpg";
import img4 from "../public/images/image-product-4.jpg";
import img4Thumb from "../public/images/image-product-4-thumbnail.jpg";
import { Product } from "./types";

export const navPages = [
  {
    page: "Collections",
    url: "#",
  },
  {
    page: "Men",
    url: "#",
  },
  {
    page: "Women",
    url: "#",
  },
  {
    page: "About",
    url: "#",
  },
  {
    page: "Contact",
    url: "#",
  },
];

export const product: Product[] = [
  {
    id: "1",
    brand: "Sneaker Company",
    name: "Fall Limited Edition Sneakers",
    description:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: 250.0,
    discount: 0.5,
    images: [
      {
        img: img1,
        thumbnail: img1Thumb,
      },
      {
        img: img2,
        thumbnail: img2Thumb,
      },
      {
        img: img3,
        thumbnail: img3Thumb,
      },
      {
        img: img4,
        thumbnail: img4Thumb,
      },
    ],
  },
];
