import type { APIRoute } from "astro";
import Product from "db/models/Product";
import Wishlist_Item from 'db/models/Wishlist_Item';

export const GET: APIRoute = async ({ params }) => {
  const userUUID = params.user_uuid;
  const wishlistItems = await Wishlist_Item.findAll({
    where: {
      user_uuid: userUUID,
    },
    include: [{ model: Product, attributes: ['uuid', 'name', 'price', 'image_src', 'category', 'quantity'] }],
    order: [['createdAt', 'ASC']],

  });
  return new Response(JSON.stringify(wishlistItems), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',

    }
  });
};
// backup function so that the wishlist items can load when run through the ssl secured production server
export async function getWishlistItems(userUUID) {
  const wishlistItems = await Wishlist_Item.findAll({
    where: {
      user_uuid: userUUID,
    },
    include: [{ model: Product, attributes: ['uuid', 'name', 'price', 'image_src', 'category', 'quantity'] }],
    order: [['createdAt', 'ASC']],

  });
  return new Response(JSON.stringify(wishlistItems), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',

    }
  });
}