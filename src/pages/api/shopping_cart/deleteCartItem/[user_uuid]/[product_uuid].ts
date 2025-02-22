 import type { APIRoute } from "astro";
import Shopping_Cart_Item  from 'db/models/Shopping_Cart_Item';
import Product from "db/models/Product";

export const DELETE: APIRoute = async ({ params }) => {
 const user_uuid = params.user_uuid;
 const product_uuid = params.product_uuid;
     const product = await Product.findOne({ where: { uuid: product_uuid } });

     // Check if the item already exists
    const existingCartItem = await Shopping_Cart_Item.findOne({
        where: {
            user_uuid: user_uuid,
            product_uuid: product_uuid,
        },
    });
        if (existingCartItem?.product_quantity! > 1 && existingCartItem?.total_price! > 1) {
       // If the item exists, decrement its properties
        await existingCartItem!.decrement({
            product_quantity: 1,
            total_price: product!.price,
        });
 if(existingCartItem!.product_quantity === 0 && existingCartItem!.total_price === 0)   
 await Shopping_Cart_Item.destroy({ where: {user_uuid: user_uuid, product_uuid: product_uuid} });

        return new Response(null, {
            status: 204,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        });
    }

  await Shopping_Cart_Item.destroy({ where: {user_uuid: user_uuid, product_uuid: product_uuid} });
return new Response(null, {
      status: 204,
      headers: {
        'Content-Type': 'application/json'
      }
    });
};