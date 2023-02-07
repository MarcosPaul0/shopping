import Image from "next/future/image";
import Head from "next/head";
import { GetStaticProps } from "next";

import { useKeenSlider } from "keen-slider/react";

import { stripe } from "../lib/stripe";
import {
  HomeContainer,
  ItemInfoContainer,
  Product,
} from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";
import Stripe from "stripe";
import { Handbag } from "phosphor-react";
import { useCartContext } from "../contexts/CartContext";
import { formatNumberToReal } from "../utils/formatNumberToReal";
import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { useNotify } from "../hooks/useNotify";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceId: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const { addCartItem } = useCartContext();

  const { successNotify } = useNotify();

  const router = useRouter();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  async function handleNavigateToProduct(productId: string) {
    await router.push(`/product/${productId}`);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          const formattedPrice = formatNumberToReal(product.price);

          return (
            <div
              key={product.id}
              onClick={() => handleNavigateToProduct(product.id)}
              role="button"
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <ItemInfoContainer>
                    <strong>{product.name}</strong>
                    <span>{formattedPrice}</span>
                  </ItemInfoContainer>

                  <button
                    onClick={(event: MouseEvent) => {
                      event.stopPropagation();

                      addCartItem({
                        imageUrl: product.imageUrl,
                        name: product.name,
                        price: product.price,
                        priceId: product.priceId,
                      });

                      successNotify('Item adicionado ao carrinho')
                    }}
                  >
                    <Handbag />
                  </button>
                </footer>
              </Product>
            </div>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      priceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  };
};
