import Auction from 'db/models/Auction.js';

export const DELETE = async () => {
    // Use Sequelize to delete all products from the database
    await Auction.destroy({ where: {} });

    return new Response(null, {
      status: 204,
        headers: {
        "Content-Type": "application/json"
      }
    });
};
 