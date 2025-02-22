import type { APIRoute } from "astro";
import Order from 'db/models/Order';

export const POST: APIRoute = async ({ request }) => {
  const { user_uuid, ship_address_uuid, order_items,total_price_amount, order_status, payment_status } = await request.json();

    // Create a new order with the valid shipping address
    const newOrder = await Order.create({
      ship_address_uuid,
      user_uuid, 
      order_items,
      total_price_amount,
      order_status,
      payment_status
    });

    return new Response(JSON.stringify(newOrder), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
};
