import Wishlist_Item  from 'db/models/Wishlist_Item';
import type { APIRoute } from "astro"
export const DELETE: APIRoute = async ({params}) => {
  const userUUID = params.user_uuid;
    const deletedWishListProducts = await Wishlist_Item.destroy({
      where: { user_uuid: userUUID },
    });

    if (deletedWishListProducts) {
      return new Response(JSON.stringify({message: "You have sucessfully deleted your entire wishlist!"}), {
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