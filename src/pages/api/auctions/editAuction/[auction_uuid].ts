import Auction from 'db/models/Auction.ts';
import type { APIRoute } from 'astro';
export const PUT: APIRoute = async ({ request, params }) => {
  const auctionUUID = params.auction_uuid;
  const body: Auction = await request.json()
  const auction = await Auction.findOne({ where: { auction_uuid: auctionUUID } });
  await Auction.update({
      name: body.name,
      description: body.description,
      initial_price: body.initial_price,
      minimum_bid_increment_percentage: body.minimum_bid_increment_percentage,
      start_time: body.start_time,
      end_time: body.end_time
    },
    { where: {
        auction_uuid: auction!.auction_uuid,
      },
    }
  );
  return new Response(
    JSON.stringify({ message: 'Auction updated successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );
};
