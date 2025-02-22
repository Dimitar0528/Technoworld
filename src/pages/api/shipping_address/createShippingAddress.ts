import Shipping_Adress from 'db/models/Shipping_Address.js';
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const shipping_address_data = await request.json();
      // Create a new shipping address if none exists
      const newShippingAddress = await Shipping_Adress.create(shipping_address_data);

      return new Response(JSON.stringify(newShippingAddress), {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
