import Shipping_Address from 'db/models/Shipping_Address';
import type { APIRoute } from "astro"
export const DELETE: APIRoute = async ({params}) => {
  const userUUID = params.user_uuid;
    const deletedCartProducts = await Shipping_Address.destroy({
      where: { user_uuid: userUUID },
    });

    if (deletedCartProducts) {
      return new Response(JSON.stringify({message: "You have sucessfully deleted your shipping address!"}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        }
      }); 
    } else {
      return new Response(JSON.stringify({ error: 'Shipping address not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
}