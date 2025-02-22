import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import User from "./User.ts";
import Product from "./Product.ts";

/**
 * Represents an item in the shopping cart.
 * @extends Model
 */
class Shopping_Cart_Item extends Model {
  /**
   * The UUID of the shopping cart item.
   * @type {string}
   */
  declare cart_item_uuid: string;

  /**
   * The UUID of the user who owns the shopping cart item.
   * @type {string}
   */
  declare user_uuid: string;

  /**
   * The UUID of the product associated with the shopping cart item.
   * @type {string}
   */
  declare product_uuid: string;

  /**
   * The quantity of the product in the shopping cart.
   * @type {number}
   */
  declare product_quantity: number;

  /**
   * The total price of the shopping cart item.
   * @type {number}
   */
  declare total_price: number;

  /**
   * The product associated with the shopping cart item.
   * @type {Product}
   */
  declare Product: Product;
}

Shopping_Cart_Item.init(
  {
    cart_item_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      references: {
        model: User, // This is the model you're referencing
        key: "uuid", // This is the primary key of the referenced model
      },
    },
    product_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      references: {
        model: Product,
        key: "uuid",
      },
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance, // Pass the initialized sequelize connection
    modelName: "Shopping_Cart_Item",
    tableName: "shopping_cart_items",
    updatedAt: false,
  }
);
Shopping_Cart_Item.belongsTo(User, { foreignKey: "user_uuid" });
Shopping_Cart_Item.belongsTo(Product, { foreignKey: "product_uuid" });
User.hasMany(Shopping_Cart_Item, { foreignKey: "user_uuid" });
Product.hasMany(Shopping_Cart_Item, { foreignKey: "product_uuid" });

export default Shopping_Cart_Item;
