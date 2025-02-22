import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection";

/**
 * Represents a user in the system.
 * @extends Model
 */
class User extends Model {
  /**
   * The UUID of the user.
   * @type {string}
   */
  declare uuid: string;

  /**
   * The username of the user.
   * @type {string}
   */
  declare username: string;

  /**
   * The email address of the user.
   * @type {string}
   */
  declare email_adress: string;

  /**
   * The password of the user.
   * @type {string}
   */
  declare password: string;

  /**
   * The role of the user, either "user" or "admin".
   * @type {"user" | "admin"}
   */
  declare role: "user" | "admin";

  /**
   * The first name of the user.
   * @type {string}
   */
  declare first_name: string;

  /**
   * The last name of the user.
   * @type {string}
   */
  declare last_name: string;

  /**
   * The phone number of the user.
   * @type {string}
   */
  declare phone_number: string;

  /**
   * The gender of the user (optional).
   * @type {string | undefined}
   */
  declare gender?: string;

  /**
   * Indicates whether the user is subscribed to the newsletter or not.
   * @type {boolean}
   */
  declare is_subscribed_to_newsletter: boolean;
}

User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.CHAR,
      defaultValue: null,
    },
    first_name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    is_subscribed_to_newsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance, // Pass the initialized sequelize connection
    modelName: "User",
    tableName: "users",
  }
);

export default User;
