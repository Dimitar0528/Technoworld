import Shopping_Cart_Item  from 'db/models/Shopping_Cart_Item';
import type { APIRoute } from "astro"
export const DELETE: APIRoute = async ({params}) => {
  const userUUID = params.user_uuid;
    const deletedCartProducts = await Shopping_Cart_Item.destroy({
      where: { user_uuid: userUUID },
    });

    if (deletedCartProducts) {
      return new Response(JSON.stringify({message: "You have sucessfully deleted your entire shopping cart!"}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        }
      }); 
    } else {
      return new Response(JSON.stringify({ error: 'Wishlist not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
}