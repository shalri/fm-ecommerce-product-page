import { StaticImageData } from "next/image";

export interface ProductImage {
  img: StaticImageData;
  thumbnail: StaticImageData;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: ProductImage[];
}
