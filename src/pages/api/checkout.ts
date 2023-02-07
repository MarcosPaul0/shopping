import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

interface Items {
  items: {
    price: string;
    quantity: number;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body as Items;

  console.log(items);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Items not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: "payment",
      line_items: items,
    });

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: "Error in checkout session create" });
  }
}
