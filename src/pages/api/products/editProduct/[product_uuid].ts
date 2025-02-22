import Product from "db/models/Product.ts"; import type { APIRoute } from "astro";
export const PUT: APIRoute = async ({ request, params }) => {
  const productUUID = params.product_uuid;
  const body: Product = await request.json();
  const product = await Product.findOne({ where: { uuid: productUUID } });
  await Product.update(
    {
      image_src: body.image_src || product!.image_src,
      image_src_2: body.image_src_2 || product!.image_src_2,
      image_src_3: body.image_src_3 || product!.image_src_3,
      name: body.name || product!.name,
      description: body.description || product!.description,
      price: body.price || product!.price,
      category: body.category || product!.category,
      quantity: body.quantity || product!.quantity,
      advertisable: body.advertisable || product!.advertisable,
      biddable: body.biddable || product!.biddable,
    },
    { where: {  uuid: product!.uuid,  }, } );
  return new Response( JSON.stringify({ message: "Product updated successfully!" }), {
      status: 200, headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache", }, } ); };
