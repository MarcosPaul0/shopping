import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from "../styles/pages/success";

interface SuccessProps {
  costumerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImagesContainer>
          {products.map((product) => (
            <ImageContainer key={product.name}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <p>
          Uhuul <strong>{costumerName}</strong>
          {products.length > 1 ? (
            ", seus produtos já estão"
          ) : (
            <span>
              , sua <strong>{products[0].name}</strong> já está
            </span>
          )}{" "}
          a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const costumerName = session.customer_details.name;

  const items = session.line_items.data;

  const products = items.map((product) => {
    const productData: Stripe.Product = product.price.product as Stripe.Product;

    return {
      name: productData.name,
      imageUrl: productData.images[0],
    };
  });

  return {
    props: {
      costumerName,
      products,
    },
  };
};
