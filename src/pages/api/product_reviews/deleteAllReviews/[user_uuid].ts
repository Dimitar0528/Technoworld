import Product_Review  from 'db/models/Product_Review';
import type { APIRoute } from "astro"
export const DELETE: APIRoute = async ({params}) => {
  const userUUID = params.user_uuid;
    const deletedUserReviews = await Product_Review.destroy({
      where: { user_uuid: userUUID },
    });

    if (deletedUserReviews) {
      return new Response(JSON.stringify({message: "You have sucessfully deleted all of your reviews!"}), {
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