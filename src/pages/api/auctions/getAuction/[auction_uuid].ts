// Import the User model and other necessary dependencies
import Auction from 'db/models/Auction.js';
import type { APIRoute } from 'astro';

export const getAuction: APIRoute = async ({ params }) => {
  const auction_uuid = params.auction_uuid;

  try {
    const auction = await Auction.findOne({
      where: { auction_uuid },
    });
    return new Response(JSON.stringify(auction), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
