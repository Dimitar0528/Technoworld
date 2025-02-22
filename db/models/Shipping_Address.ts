import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection";
import User from "./User";

/**
 * Represents a shipping address.
 * @extends Model
 */
class Shipping_Adress extends Model {
  /**
   * The UUID of the shipping address.
   * @type {string}
   */
  declare shipping_address_uuid: string;

  /**
   * The UUID of the user associated with the shipping address.
   * @type {string}
   */
  declare user_uuid: string;

  /**
   * The address of the shipping address.
   * @type {string}
   */
  declare address: string;

  /**
   * The city of the shipping address.
   * @type {string}
   */
  declare city: string;

  /**
   * The state of the shipping address.
   * @type {string}
   */
  declare state: string;

  /**
   * The postal code of the shipping address.
   * @type {number}
   */
  declare postal_code: number;

  /**
   * The country of the shipping address.
   * @type {string}
   */
  declare country: string;

  /**
   * The user associated with the shipping address.
   * @type {User}
   */
  declare User: User;
}

Shipping_Adress.init(
  {
    shipping_address_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    user_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      references: {
        model: User,
        key: "uuid",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Shipping_Adress",
    tableName: "shipping_addresses",
    updatedAt: false,
  }
);
Shipping_Adress.belongsTo(User, { foreignKey: "user_uuid" });
User.hasOne(Shipping_Adress, { foreignKey: "user_uuid" });
export default Shipping_Adress;
