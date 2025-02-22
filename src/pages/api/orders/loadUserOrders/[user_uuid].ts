import type { APIRoute } from "astro";
import Order  from 'db/models/Order';
export const GET: APIRoute = async ({ params }) => {
    const userUUID = params.user_uuid;
    const userOrders = await Order.findAll({
      where: { user_uuid : userUUID },
      order: [['createdAt', 'DESC']],
    });

return new Response(
      JSON.stringify(userOrders), {
        status: 200,
          headers: {
        "Content-Type": "application/json"
      }
      }
    );
}
      