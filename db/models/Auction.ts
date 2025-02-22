import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection";
import Product from "./Product";
import User from "./User";

/**
 * Represents an auction.
 * @extends Model
 */
class Auction extends Model {
  /** @type {string} Unique identifier for the auction. */
  declare auction_uuid: string;

  /** @type {string} Name of the auction. */
  declare name: string;

  /** @type {string} Description of the auction. */
  declare description: string;

  /** @type {string} UUID of the associated product. */
  declare product_uuid: string;

  /** @type {Date} Start time of the auction. */
  declare start_time: Date;

  /** @type {Date} End time of the auction. */
  declare end_time: Date;

  /** @type {number} Percentage by which bids must be incremented. */
  declare minimum_bid_increment_percentage: number;

  /** @type {number} Initial price of the auction. */
  declare initial_price: number;

  /** @type {number} Price at which the item can be purchased immediately. */
  declare purchase_price: number;

  /** @type {number} Number of bids made in the auction. */
  declare bid_counter: number;

  /** @type {number} Current highest bid amount. */
  declare current_highest_bid: number;

  /** @type {string} UUID of the current highest bidder. */
  declare current_highest_bidder: string;

  /** @type {string} JSON string representing the bid history. */
  declare bid_history: string;

  /** @type {Date} Timestamp of creation of the auction record. */
  declare createdAt: Date;

  /** @type {Date} Timestamp of last update to the auction record. */
  declare updatedAt: Date;
}
Auction.init(
  {
    auction_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,

      references: {
        model: Product,
        key: "uuid",
      },
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    minimum_bid_increment_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initial_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase_price: {
      type: DataTypes.DOUBLE(4, 2),
      allowNull: false,
    },
    bid_counter: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    current_highest_bid: {
      type: DataTypes.DOUBLE(4, 2),
    },
    current_highest_bidder: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: User,
        key: "uuid",
      },
    },
    bid_history: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Auction",
    tableName: "auctions",
  }
);

export default Auction;
