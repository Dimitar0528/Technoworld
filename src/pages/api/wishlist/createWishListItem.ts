 import type { APIRoute } from "astro";
import Wishlist_Item  from 'db/models/Wishlist_Item';

export const POST: APIRoute = async ({ request }) => {
 const {user_uuid, product_uuid }:{ user_uuid:string, product_uuid:string} = await request.json();
     const newWishListItem = await Wishlist_Item.create({ user_uuid, product_uuid });

return new Response(JSON.stringify(newWishListItem), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
};
