import Product from 'db/models/Product.ts';
export async function GetAllBiddableProducts() {
    const products = await Product.findAll({ where: { biddable: true }});
    if (products.length === 0) {
      return new Response(JSON.stringify({ error: 'Products not found' }), {
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
        "Content-Type": "application/json"
      }
      }
    );
}
