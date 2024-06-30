import Header from "../components/Header";
import SandBox from "../components/Sandbox";
import Footer from "../components/Footer";
import ProductPage from "@/components/ProductPage";
import { CartProvider } from "@/contexts/CartContext";

export default function Home() {
  return (
    <>
      <CartProvider>
        <Header />
        <ProductPage itemName="Fall Limited Edition Sneakers" />
      </CartProvider>
    </>
  );
}
