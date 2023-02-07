import "react-toastify/dist/ReactToastify.css";

import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import { Container } from "../styles/pages/app";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { CartContextProvider } from "../contexts/CartContext";
import { CartSidebar } from "../components/CartSidebar";
import { Header } from "../components/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [cartSidebarIsOpen, setCartSidebarIsOpen] = useState(false);

  function handleOpenCartSidebar() {
    setCartSidebarIsOpen(true);
  }

  function handleCloseCartSidebar() {
    setCartSidebarIsOpen(false);
  }

  return (
    <CartContextProvider>
      <Container>
        <Header handleOpenCartSidebar={handleOpenCartSidebar} />

        <Component {...pageProps} />

        <CartSidebar
          isOpen={cartSidebarIsOpen}
          handleClose={handleCloseCartSidebar}
        />
      </Container>

      <ToastContainer />
    </CartContextProvider>
  );
}
