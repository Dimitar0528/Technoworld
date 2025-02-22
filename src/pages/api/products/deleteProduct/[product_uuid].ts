import Product from "db/models/Product.js";
import type { APIRoute } from "astro";
export const DELETE: APIRoute = async ({ params }) => {
  const productUUID = params.product_uuid;
  const deletedProduct = await Product.destroy({
    where: { uuid: productUUID },
  });
  if (deletedProduct) {
    return new Response(null, {
      status: 204,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(JSON.stringify({ error: "An Error occured" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      }, });}};
