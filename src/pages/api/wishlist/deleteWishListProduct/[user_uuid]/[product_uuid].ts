 import type { APIRoute } from "astro";
import Wishlist_Item  from 'db/models/Wishlist_Item';

export const DELETE: APIRoute = async ({ params }) => {
 const user_uuid = params.user_uuid;
 const product_uuid = params.product_uuid;
  await Wishlist_Item.destroy({ where: {user_uuid: user_uuid, product_uuid: product_uuid} });
return new Response(null, {
      status: 204,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });
};