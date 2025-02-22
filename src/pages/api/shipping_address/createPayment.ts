import type { APIRoute } from "astro";
import Stripe from 'stripe';
const stripe = new Stripe(import.meta.env.STRIPE_API_SECRET_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { currency,lineItems,userUUID } = await request.json();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: currency === 'bgn' ? ["card"] : ["card", "paypal"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${import.meta.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&user_uuid=${userUUID}`,
    cancel_url: `${import.meta.env.CLIENT_URL}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}&user_uuid=${userUUID}`,
  });    
    return new Response(JSON.stringify({sessionId: session.id}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
};