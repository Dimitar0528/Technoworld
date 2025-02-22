import type { APIRoute } from "astro";
import User from "db/models/User";
import Shipping_Address from 'db/models/Shipping_Address';

export const GET: APIRoute = async ({ params }) => {
  const userUUID = params.user_uuid;
  const shipping_address = await Shipping_Address.findOne({
    where: {
      user_uuid: userUUID,
    },
    include: [{ model: User, attributes: ['uuid','first_name', 'last_name' ,'email_adress', 'role'] }],
  });
  return new Response(JSON.stringify(shipping_address), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// backup function so that the shipping address can load when run through the ssl secured production server
export async function getShippingAddress(userUUID) {
 const shipping_address = await Shipping_Address.findOne({
    where: {
      user_uuid: userUUID,
    },
    include: [{ model: User, attributes: ['uuid','first_name', 'last_name' ,'email_adress', 'role'] }],
  });
  return new Response(JSON.stringify(shipping_address), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}