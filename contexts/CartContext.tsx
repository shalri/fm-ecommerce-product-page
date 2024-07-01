"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

interface CartContextProps {
  itemCount: number;
  setItemCount: (count: number) => void;
  itemName: string;
  setItemName: (name: string) => void;
  itemPrice: string;
  setItemPrice: (price: string) => void;
  setDynamicPrice: (price: number, discount: number) => void;
  itemThumbnail: string;
  setItemThumbnail: (thumbnail: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemThumbnail, setItemThumbnail] = useState("");

  const setDynamicPrice = (price: number, discount: number) => {
    const computedPrice = discount ? price * (1 - discount) : price;
    setItemPrice(computedPrice.toFixed(2));
  };

  const clearCart = () => {
    setItemCount(0);
    setItemName("");
    setItemPrice("");
    setItemThumbnail("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("cartData");
      if (storedData) {
        const {
          itemCount: storedItemCount,
          itemName: storedItemName,
          itemPrice: storedItemPrice,
          itemThumbnail: storedItemThumbnail,
        } = JSON.parse(storedData);
        setItemCount(storedItemCount);
        setItemName(storedItemName);
        setItemPrice(storedItemPrice);
        setItemThumbnail(storedItemThumbnail);
      }
    }
  }, []);

  const saveCartToLocalStorage = useCallback(() => {
    if (typeof window !== "undefined") {
      const cartData = { itemCount, itemName, itemPrice, itemThumbnail };
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
  }, [itemCount, itemName, itemPrice, itemThumbnail]);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [itemCount, itemName, itemPrice, itemThumbnail, saveCartToLocalStorage]);

  return (
    <CartContext.Provider
      value={{
        itemCount,
        setItemCount,
        itemName,
        setItemName,
        itemPrice,
        setItemPrice,
        setDynamicPrice,
        itemThumbnail,
        setItemThumbnail,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
