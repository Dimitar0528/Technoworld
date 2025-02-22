import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import User from "./User.ts";
import Shipping_Adress from "./Shipping_Address.ts";

/**
 * Represents an order.
 * @extends Model
 */
class Order extends Model {
  /**
   * The UUID of the order.
   * @type {string}
   */
  declare order_uuid: string;

  /**
   * The UUID of the user who placed the order.
   * @type {string}
   */
  declare user_uuid: string;

  /**
   * The UUID of the shipping address associated with the order.
   * @type {string}
   */
  declare ship_address_uuid: string;

  /**
   * The total price amount of the order.
   * @type {number}
   */
  declare total_price_amount: number;

  /**
   * The status of the order.
   * @type {string}
   */
  declare order_status: string;

  /**
   * The payment status of the order.
   * @type {string}
   */
  declare payment_status: string;

  /**
   * The number of items in the order.
   * @type {number}
   */
  declare order_items: number;

  /**
   * The user associated with the order.
   * @type {User}
   */
  declare User: User;

  /**
   * The timestamp when the order was created.
   * @type {string}
   */
  declare createdAt: string;
}

Order.init(
  {
    order_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      references: {
        model: User,
        key: "uuid",
      },
    },
    ship_address_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      references: {
        model: Shipping_Adress,
        key: "shipping_address_uuid",
      },
    },
    total_price_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_items: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Order",
    tableName: "orders",
    updatedAt: false,
  }
);
Order.belongsTo(User, { foreignKey: "user_uuid" });
Order.belongsTo(Shipping_Adress, { foreignKey: "ship_address_uuid" });
User.hasMany(Order, { foreignKey: "user_uuid" });
Shipping_Adress.hasMany(Order, { foreignKey: "ship_address_uuid" });

export default Order;
