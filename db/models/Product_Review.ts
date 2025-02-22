import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import User from "./User.ts";
import Product from "./Product.ts";

/**
 * Represents a product review.
 * @extends Model
 */
class Product_Review extends Model {
  /**
   * The UUID of the product review.
   * @type {string}
   */
  declare review_uuid: string;

  /**
   * The UUID of the user who wrote the review.
   * @type {string}
   */
  declare user_uuid: string;

  /**
   * The UUID of the product being reviewed.
   * @type {string}
   */
  declare product_uuid: string;

  /**
   * The rating given in the review.
   * @type {number}
   */
  declare rating: number;

  /**
   * The text content of the review.
   * @type {string}
   */
  declare review_text: string;

  /**
   * The user who wrote the review.
   * @type {User}
   */
  declare User: User;

  /**
   * The timestamp when the review was created.
   * @type {string}
   */
  declare createdAt: string;
}

Product_Review.init(
  {
    review_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,

      references: {
        model: User,
        key: "uuid",
      },
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_text: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Product_Review",
    tableName: "product_reviews",
    updatedAt: false,
  }
);
Product_Review.belongsTo(User, { foreignKey: "user_uuid" });
User.hasMany(Product_Review, { foreignKey: "user_uuid" });

Product_Review.belongsTo(Product, { foreignKey: "product_uuid" });
Product.hasMany(Product_Review, { foreignKey: "product_uuid" });
export default Product_Review;
