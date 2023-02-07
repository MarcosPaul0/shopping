import Image from "next/image";
import { CartButton, HeaderContainer } from "./styles";
import logoImg from "../../assets/logo.svg";
import { useCartContext } from "../../contexts/CartContext";
import { Handbag } from "phosphor-react";
import Link from "next/link";

interface HeaderProps {
  handleOpenCartSidebar: () => void;
}

export function Header({ handleOpenCartSidebar }: HeaderProps) {
  const { cart } = useCartContext();

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <CartButton onClick={handleOpenCartSidebar}>
        <div>{cart.length}</div>
        <Handbag />
      </CartButton>
    </HeaderContainer>
  );
}
