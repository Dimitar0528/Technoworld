import type { APIRoute } from "astro"
import Product_Review  from 'db/models/Product_Review';
import User from "db/models/User";
import Product from "db/models/Product";


export const GET: APIRoute = async ({params}) => {
    const product_uuid = params.product_uuid;

    const product_reviews = await Product_Review.findAll({
      where: { product_uuid: product_uuid },
        include: [{ model: User,  attributes: ['uuid', 'username','first_name','last_name'] },{model: Product, attributes:['average_rating']}],
        order: [['createdAt', 'DESC']],


    });

    return new Response(JSON.stringify(product_reviews), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
};
