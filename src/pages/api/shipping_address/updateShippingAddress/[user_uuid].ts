import Shipping_Adress from 'db/models/Shipping_Address.js';
import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({request }) => {
  try {
    const shipping_address_data = await request.json();
    const { user_uuid,address,city,state,postal_code,country }:Shipping_Adress = shipping_address_data;

    const existingShippingAddress = await Shipping_Adress.findOne({
      where: { user_uuid },
    });
 
    if (!existingShippingAddress) {
        return new Response(
            JSON.stringify({ error: 'Shipping address not found' }),
            {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
        }
if(address === existingShippingAddress.address && city === existingShippingAddress.city && state === existingShippingAddress.state && postal_code === existingShippingAddress.postal_code && country === existingShippingAddress.country){
     return new Response(
            JSON.stringify({ error: 'You need to update at least one property in order to update your shipping address!' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json ',
                },
            }
            );
        }

  await Shipping_Adress.update({
  address, city, state, postal_code, country
},
{where : {
  user_uuid
}
});
      return new Response(JSON.stringify(existingShippingAddress), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
