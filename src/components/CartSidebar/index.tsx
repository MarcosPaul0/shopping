import { X } from "phosphor-react";
import {
  CartInfoContainer,
  CartSidebarContainer,
  CloseButton,
  ImageContainer,
  InfoContainer,
  ListItem,
} from "./styles";
import Image from "next/image";
import { formatNumberToReal } from "../../utils/formatNumberToReal";
import { Button } from "../Button";
import { useMemo, useState } from "react";
import { useCartContext } from "../../contexts/CartContext";
import { useNotify } from "../../hooks/useNotify";
import axios from "axios";

interface TotalItems {
  itemsQuantity: number;
  totalPrice: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function CartSidebar({ isOpen, handleClose }: CartSidebarProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const { cart, removeCartItem, clearCart } = useCartContext();

  const { errorNotify } = useNotify();

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        items: cart.map((item) => ({
          price: item.priceId,
          quantity: item.quantity,
        })),
      });

      clearCart();

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      console.log(err)
      setIsCreatingCheckoutSession(false);

      errorNotify("Falha ao redirecionar ao checkout!");
    }
  }

  const totalAmountFormatted = useMemo(() => {
    const totalItems = cart.reduce<TotalItems>(
      (totalItems, item) => {
        return {
          itemsQuantity: totalItems.itemsQuantity + item.quantity,
          totalPrice: totalItems.totalPrice + item.quantity * item.price,
        };
      },
      {
        itemsQuantity: 0,
        totalPrice: 0,
      }
    );

    return {
      itemsQuantity: totalItems.itemsQuantity,
      totalPrice: formatNumberToReal(totalItems.totalPrice),
    };
  }, [cart]);

  const buyButtonIsDisabled = isCreatingCheckoutSession || cart.length <= 0;

  return (
    <CartSidebarContainer isOpen={isOpen}>
      <CloseButton onClick={handleClose}>
        <X />
      </CloseButton>

      <h1>Sacola de compras</h1>

      <ul>
        {cart.map((item) => (
          <ListItem key={item.priceId}>
            <ImageContainer>
              <Image src={item.imageUrl} width={94} height={94} alt="" />
            </ImageContainer>
            <InfoContainer>
              <h2>{item.name}</h2>

              <span>{formatNumberToReal(item.price * item.quantity)}</span>

              <button onClick={() => removeCartItem(item.priceId)}>
                Remover
              </button>
            </InfoContainer>
          </ListItem>
        ))}
      </ul>

      <CartInfoContainer>
        <span>
          Quantidade <span>{totalAmountFormatted.itemsQuantity} itens</span>
        </span>

        <strong>
          Valor total <span>{totalAmountFormatted.totalPrice}</span>
        </strong>
      </CartInfoContainer>

      <Button text="Finalizar compra" disabled={buyButtonIsDisabled} onClick={handleBuyButton} />
    </CartSidebarContainer>
  );
}
