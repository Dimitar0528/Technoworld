import Product from 'db/models/Product.ts';
export async function GetAdvertisedProducts() {
    const products = await Product.findAll({
      where: {
        advertisable: true
      }
    });
    if (!products) {
      return new Response(JSON.stringify({ error: 'Advertised products not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(
      JSON.stringify(products), {
        status: 200,
          headers: {
        "Content-Type": "application/json",
      }
      }
    );
}
