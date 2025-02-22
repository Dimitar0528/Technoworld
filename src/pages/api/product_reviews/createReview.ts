import type { APIRoute } from "astro";
import Product from "db/models/Product";
import Product_Review  from 'db/models/Product_Review';

export const POST: APIRoute = async ({ request }) => {
 const {user_uuid,product_uuid, rating, review_text } = await request.json();
 await Product_Review.create({ user_uuid, product_uuid, rating, review_text });

 const product = await Product.findOne({
   where: { uuid: product_uuid },
  });
      if (!product) {
    return new Response(
      JSON.stringify({ error: 'Product not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
    const product_reviews = await Product_Review.findAll({
      where: { product_uuid: product_uuid },
    });
const totalRatings: number = product_reviews.reduce((sum, review) => {
  return sum + review.dataValues.rating ;
}, 0);

const averageRating = totalRatings / product_reviews.length;

await Product.update({
  average_rating: averageRating
},
{where : {
  uuid: product.uuid,
}
});
return new Response(null, {
      status: 204,
      headers: {
        'Content-Type': 'application/json'
      }
    });
};
