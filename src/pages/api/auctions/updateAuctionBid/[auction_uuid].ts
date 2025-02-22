import Auction from 'db/models/Auction.ts';
import type { APIRoute } from 'astro';
import User from 'db/models/User';
export const PUT: APIRoute = async ({ request, params }) => {
  const auctionUUID = params.auction_uuid;
  const { current_highest_bid, current_highest_bidder }: Auction = await request.json();
  const auction = await Auction.findOne({ where: { auction_uuid: auctionUUID } });

  if (!auction) {
    return new Response(
      JSON.stringify({ error: 'Auction not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const user = await User.findOne({ where: { uuid: current_highest_bidder } });
  auction.current_highest_bid = current_highest_bid;
  auction.current_highest_bidder = current_highest_bidder;
  // Increment bid_counter and save the auction
  await auction.increment({
    bid_counter: 1,
  });
  await auction.save();
  // Create bid_history_obj
  const bid_history_obj = {
    bid_amount: auction.current_highest_bid,
    username: user?.username,
    updatedAt: new Date(auction.updatedAt).toLocaleString("en-GB"),
  };

  let existing_bid_history = JSON.parse(auction.bid_history || '[]');
  // Append new bid_history_obj to existing_bid_history
  existing_bid_history.push(bid_history_obj);

  const updated_bid_history_json = JSON.stringify(existing_bid_history);

  auction.bid_history = updated_bid_history_json;

    await auction.save();

  const responseObj = {
    user_bid:  bid_history_obj,
    auction_uuid: auction.auction_uuid
  }
  return new Response(JSON.stringify(responseObj), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
};
