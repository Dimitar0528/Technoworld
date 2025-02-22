import  Product  from 'db/models/Product.js';
import type { APIRoute } from "astro"
export const GET: APIRoute = async ({params}) => {
    const productId = params.product_uuid;
    const product = await Product.findOne({
      where: { uuid: productId },
    });
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
};

export const getProducts = async (product_uuid:string) => {
    // Use Sequelize to find the product by ID
    const product = await Product.findOne({
      where: { uuid: product_uuid },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
};