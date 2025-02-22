import type { APIRoute } from "astro";
import Product from "db/models/Product";
import Shopping_Cart_Item from 'db/models/Shopping_Cart_Item';

export const POST: APIRoute = async ({ request }) => {
    const { user_uuid, product_uuid }: { user_uuid:string,product_uuid:string } = await request.json();
    const product = await Product.findOne({ where: { uuid: product_uuid } });
    // Check if the item already exists
    const existingCartItem = await Shopping_Cart_Item.findOne({
        where: {
            user_uuid: user_uuid,
            product_uuid: product_uuid,
        },
    });

    if (existingCartItem) {
       // If the item exists, increment its properties
        await existingCartItem.increment({
            product_quantity: 1,
            total_price: product!.price,
        });

     const responseObj = {
        existingCartItem:existingCartItem,
        product_price: product!.price,
     }
        return new Response(JSON.stringify(responseObj), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        });
    }

    const product_quantity = 1;
    const total_price = product!.price;

    const newShoppingCartItem = await Shopping_Cart_Item.create({
        user_uuid,
        product_uuid,
        product_quantity,
        total_price,
    });

    const responseObj = {
        newShoppingCartItem:newShoppingCartItem,
        product_price:product!.price,
    }
    return new Response(JSON.stringify(responseObj), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
    });
};
