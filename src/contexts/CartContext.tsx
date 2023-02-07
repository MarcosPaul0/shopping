import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { StorageItems } from "../constants/storageItems";

interface Item {
  priceId: string;
  quantity: number;
  imageUrl: string;
  price: number;
  name: string;
}

interface CartContextData {
  cart: Item[];
  addCartItem: (newItem: AddCartItemParams) => void;
  removeCartItem: (priceId: string) => void;
}

export const CartContext = createContext({} as CartContextData);

interface CartContextProviderProps {
  children: ReactNode;
}

export interface AddCartItemParams {
  priceId: string;
  imageUrl: string;
  price: number;
  name: string;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(
      localStorage.getItem(StorageItems.CART)
    ) as Item[];

    if (cartData) {
      setCart(cartData);
    }
  }, []);

  function addCartItem(newItem: AddCartItemParams) {
    setCart((currentCart) => {
      const itemAlreadyExists = currentCart.find(
        (item) => item.priceId === newItem.priceId
      );

      if (itemAlreadyExists) {
        const cartWithUpdatedItem = currentCart.map((item) => {
          if (item.priceId === newItem.priceId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });

        localStorage.setItem(
          StorageItems.CART,
          JSON.stringify(cartWithUpdatedItem)
        );

        return cartWithUpdatedItem;
      }

      const cartWithNewItem = [...currentCart, { ...newItem, quantity: 1 }];

      localStorage.setItem(StorageItems.CART, JSON.stringify(cartWithNewItem));

      return cartWithNewItem;
    });
  }

  function removeCartItem(priceId: string) {
    setCart((currentCart) => {
      const cartWithoutItem = currentCart.filter(
        (item) => item.priceId !== priceId
      );

      localStorage.setItem(StorageItems.CART, JSON.stringify(cartWithoutItem));

      return cartWithoutItem;
    });
  }

  return (
    <CartContext.Provider value={{ cart, addCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
