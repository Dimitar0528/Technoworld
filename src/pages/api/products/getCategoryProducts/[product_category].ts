import  Product  from 'db/models/Product.js';
import type { APIRoute } from "astro"
export const GetCategoryProducts: APIRoute = async ({params}) => {

    const category = params.product_category;
    const products = await Product.findAll({
      where: {
       category: category
      },
       order: [['createdAt', 'DESC']],

    });
    
    if (products.length === 0) {
      return new Response(JSON.stringify({ error: 'Products not found for the selected category' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(
      JSON.stringify(products), {
        status:200,
         headers: {
        "Content-Type": "application/json"
      }
      }
    );
}
