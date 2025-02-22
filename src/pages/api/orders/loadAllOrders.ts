import type { APIRoute } from "astro";
import Order  from 'db/models/Order';
import User from "db/models/User";
export const getAllOrders: APIRoute = async ({  }) => {
    const allOrders = await Order.findAll({
      where: { },
      include: [{ model: User,  attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });

return new Response(
      JSON.stringify(allOrders), {
        status: 200,
          headers: {
        "Content-Type": "application/json"
      }
      }
    );
}
      