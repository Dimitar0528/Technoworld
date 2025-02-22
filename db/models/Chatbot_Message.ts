import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import User from "./User.ts"; // Import your Users model
/**
 * Represents a chatbot message.
 * @extends Model
 */
class Chatbot_Message extends Model {
  /**
   * The UUID of the message.
   * @type {string}
   */
  declare message_uuid: string;

  /**
   * The UUID of the user associated with the message.
   * @type {string}
   */
  declare user_uuid: string;

  /**
   * The content of the message.
   * @type {string}
   */
  declare message_content: string;

  /**
   * Indicates whether the message is from the user or not.
   * @type {boolean}
   */
  declare is_user_message: boolean;
}
Chatbot_Message.init(
  {
    message_uuid: {
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
        key: "uuid",
      },
    },
    message_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_user_message: {
      type: DataTypes.BOOLEAN,
      allowNull: false, },},
  {
    sequelize: sequelizeInstance, // Pass the initialized sequelize connection
    modelName: "Chatbot_Message",
    tableName: "chatbot_messages",
  }
);
Chatbot_Message.belongsTo(User, { foreignKey: "user_uuid" });
User.hasMany(Chatbot_Message, { foreignKey: "user_uuid" });
export default Chatbot_Message;
