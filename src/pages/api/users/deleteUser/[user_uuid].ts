import User from "db/models/User.js";
import type { APIRoute } from "astro";
import Chatbot_Message from "db/models/Chatbot_Message";
import Wishlist_Item from "db/models/Wishlist_Item";
import Shopping_Cart_Item from "db/models/Shopping_Cart_Item";
import Product_Review from "db/models/Product_Review";
import Shipping_Address from "db/models/Shipping_Address";
import Order from "db/models/Order";
import Auction from "db/models/Auction";

export const DELETE: APIRoute = async ({ params }) => {
  const userUUID = params.user_uuid;

  // Check if the user has wishlist items
  const hasWishlistItems = await Wishlist_Item.findOne({
    where: { user_uuid: userUUID },
  });

  // If the user has wishlist items, delete them
  hasWishlistItems &&
    (await Wishlist_Item.destroy({
      where: { user_uuid: userUUID },
    }));

  // Check if the user has shopping cart items
  const hasCartItems = await Shopping_Cart_Item.findOne({
    where: { user_uuid: userUUID },
  });

  // If the user has cart items, delete them
  hasCartItems &&
    (await Shopping_Cart_Item.destroy({
      where: { user_uuid: userUUID },
    }));

  // Check if the user has product reviews
  const hasUserReviews = await Product_Review.findOne({
    where: { user_uuid: userUUID },
  });

  // If the user has reviews, delete them
  hasUserReviews &&
    (await Product_Review.destroy({
      where: { user_uuid: userUUID },
    }));

  // Check if the user has chatbot messages
  const hasChatbotMessages = await Chatbot_Message.findOne({
    where: { user_uuid: userUUID },
  });

  hasChatbotMessages &&
    (await Chatbot_Message.destroy({
      where: { user_uuid: userUUID },
    }));

  const hasOrders = await Order.findAll({
    where: { user_uuid: userUUID },
  });
  hasOrders &&
    (await Order.destroy({
      where: { user_uuid: userUUID },
    }));

  // Check if the user has any shipping addresses
  const hasShippingAddresses = await Shipping_Address.findOne({
    where: { user_uuid: userUUID },
  });

  hasShippingAddresses &&
    (await Shipping_Address.destroy({
      where: { user_uuid: userUUID },
    }));

  // Check if the user is the highest bidder in any auction available
  const isHighestBidder = await Auction.findAll({
    where: { current_highest_bidder: userUUID },
  });

  isHighestBidder &&
    (await Auction.destroy({
      where: { current_highest_bidder: userUUID },
    }));

  // Continue with the deletion of the user
  const deletedUser = await User.destroy({
    where: { uuid: userUUID },
  });

  if (deletedUser) {
    return new Response(null, {
      status: 204,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(
      JSON.stringify({
        message: "You have successfully deleted this account!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
