import Auction from 'db/models/Auction.ts';
export async function getAllAuctions() {
    const auctions = await Auction.findAll({ });
    if (auctions.length === 0) {
      return new Response(JSON.stringify({ error: 'Products not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(
      JSON.stringify(auctions), { 
        status: 200,
          headers: {
        "Content-Type": "application/json"
      }
      }
    );
}
