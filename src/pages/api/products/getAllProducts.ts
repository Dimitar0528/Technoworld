import Product from 'db/models/Product.ts';
import { writeFile } from 'fs/promises'; // Import the necessary function from the fs module
export async function GetAllProducts() {
    const products = await Product.findAll({ where: { biddable: false }});
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
