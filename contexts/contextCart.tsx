// this code works but NextJS issues error on build
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface CartContextProps {
  itemCount: number;
  setItemCount: (count: number) => void;
  itemName: string;
  setItemName: (name: string) => void;
  itemPrice: string;
  setItemPrice: (price: string) => void;
  setDynamicPrice: (price: number, discount: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(() => {
    const storedData = localStorage.getItem("cartData");
    return storedData ? JSON.parse(storedData).itemCount : 0;
  });

  const [itemName, setItemName] = useState(() => {
    const storedData = localStorage.getItem("cartData");
    return storedData ? JSON.parse(storedData).itemName : "";
  });

  const [itemPrice, setItemPrice] = useState(() => {
    const storedData = localStorage.getItem("cartData");
    return storedData ? JSON.parse(storedData).itemPrice : "";
  });

  const isMounted = useRef(false);

  const setDynamicPrice = (price: number, discount: number) => {
    const computedPrice = discount ? price * (1 - discount) : price;
    setItemPrice(computedPrice.toFixed(2));
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const saveCartToLocalStorage = useCallback(() => {
    if (isMounted.current) {
      const cartData = {
        itemCount,
        itemName,
        itemPrice,
      };
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
  }, [itemCount, itemName, itemPrice]);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [itemCount, itemName, itemPrice, saveCartToLocalStorage]);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used with a CartProvider");
  }
  return context;
}
