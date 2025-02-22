import Product  from 'db/models/Product.js';

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const product = await request.json();
    // Create a new product using Sequelize
    const newProduct = await Product.create(product);
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });
};