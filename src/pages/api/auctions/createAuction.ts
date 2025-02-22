import Product  from 'db/models/Product.js';
import Auction  from 'db/models/Auction.js';

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const auctionObj: Auction = await request.json();
    const {product_uuid} = auctionObj;
     const product = await Product.findOne({
      where: { uuid: product_uuid },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
   const auctionProduct = {
    ...auctionObj,
    purchase_price: product.price,
   }
    const newProduct = await Auction.create(auctionProduct);
    
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });
};