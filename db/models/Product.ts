import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection";

/**
 * Represents a product.
 * @extends Model
 */
class Product extends Model {
  /**
   * The UUID of the product.
   * @type {string}
   */
  declare uuid: string;

  /**
   * The source URL of the main product image.
   * @type {string}
   */
  declare image_src: string;

  /**
   * The source URL of the second product image.
   * @type {string}
   */
  declare image_src_2: string;

  /**
   * The source URL of the third product image.
   * @type {string}
   */
  declare image_src_3: string;

  /**
   * The name of the product.
   * @type {string}
   */
  declare name: string;

  /**
   * The description of the product.
   * @type {string}
   */
  declare description: string;

  /**
   * The category of the product.
   * @type {string}
   */
  declare category: string;

  /**
   * The price of the product.
   * @type {number}
   */
  declare price: number;

  /**
   * The quantity of the product available in stock.
   * @type {number}
   */
  declare quantity: number;

  /**
   * Indicates whether the product is advertisable.
   * @type {boolean}
   */
  declare advertisable: boolean;

  /**
   * Indicates whether the product is biddable.
   * @type {boolean}
   */
  declare biddable: boolean;

  /**
   * The average rating of the product.
   * @type {number}
   */
  declare average_rating: number;
}

Product.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    image_src: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_src_2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_src_3: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    advertisable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    biddable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    average_rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelizeInstance, // Pass the initialized sequelize connection
    modelName: "Product",
    tableName: "products", // Your actual table name
  }
);

export default Product;
