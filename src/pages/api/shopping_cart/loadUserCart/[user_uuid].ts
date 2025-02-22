import type { APIRoute } from "astro";
import Product from "db/models/Product";
import Shopping_Cart_Item from 'db/models/Shopping_Cart_Item';

export const GET: APIRoute = async ({ params }) => {
  const userUUID = params.user_uuid;
  const cartItems = await Shopping_Cart_Item.findAll({
    where: {
      user_uuid: userUUID,
    },
    include: [{ model: Product, attributes: ['uuid', 'name', 'price', 'image_src', 'category','quantity'] }],
    order: [['createdAt', 'ASC']],

  });
  return new Response(JSON.stringify(cartItems), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    }
  });
};

// backup function so that the cart items can load when run through the ssl secured production server
export async function getShoppingCartItems(userUUID) {
  const cartItems = await Shopping_Cart_Item.findAll({
    where: {
      user_uuid: userUUID,
    },
    include: [{ model: Product, attributes: ['uuid', 'name', 'price', 'image_src', 'category','quantity'] }],
    order: [['createdAt', 'ASC']],

  });
  return new Response(JSON.stringify(cartItems), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    }
  });
}