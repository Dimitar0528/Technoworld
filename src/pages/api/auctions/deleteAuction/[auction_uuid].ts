import  Auction  from 'db/models/Auction.js';
import type { APIRoute } from "astro"
export const DELETE: APIRoute = async ({params}) => {
  const auctionUUID = params.auction_uuid;
  
    const deletedAuction = await Auction.destroy({
      where: { auction_uuid: auctionUUID },
    });

    if (deletedAuction) {
      return new Response(null, {
        status: 204,
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
    } else {
      return new Response(JSON.stringify({ error: 'Auction not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
}