import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import User from "./User.ts";
import Product from "./Product.ts";

/**
 * Represents an item in a user's wishlist.
 * @extends Model
 */
class Wishlist_Item extends Model {
  /**
   * The UUID of the wishlist item.
   * @type {string}
   */
  declare wishlist_item_uuid: string;

  /**
   * The UUID of the user who owns the wishlist item.
   * @type {string}
   */
  declare user_uuid: string;

  /**
   * The UUID of the product associated with the wishlist item.
   * @type {string}
   */
  declare product_uuid: string;

  /**
   * The product associated with the wishlist item.
   * @type {Product}
   */
  declare Product: Product;
}

Wishlist_Item.init(
  {
    wishlist_item_uuid: {
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
    product_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      references: {
        model: Product,
        key: "uuid",
      },
    },
  },
  {
    sequelize: sequelizeInstance, // Pass the initialized sequelize connection
    modelName: "Wishlist_Item",
    tableName: "wishlist_items",
    updatedAt: false,
  }
);
Wishlist_Item.belongsTo(User, { foreignKey: "user_uuid" });
Wishlist_Item.belongsTo(Product, { foreignKey: "product_uuid" });
User.hasMany(Wishlist_Item, { foreignKey: "user_uuid" });
Product.hasOne(Wishlist_Item, { foreignKey: "product_uuid" });

export default Wishlist_Item;
