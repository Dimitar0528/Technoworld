import Order from 'db/models/Order.ts';
import type { APIRoute } from 'astro';


export const PUT: APIRoute = async ({ request, params }) => {
  const orderUUID = params.order_uuid;
  const {order_status} = await request.json()

  const order = await Order.findOne({ where: { order_uuid: orderUUID } });

  if (!order) {
    return new Response(
      JSON.stringify({ error: 'Order not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  order.order_status = order_status;
  await order.save();

  return new Response(
    JSON.stringify({ message: 'Product updated successfully!' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );
};
