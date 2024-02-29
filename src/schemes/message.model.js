import { DataTypes } from "sequelize"
import User from "./user.model.js"
import sequelize from "../config/db.config.js"

const Message = sequelize.define("Message", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deletedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
})

Message.belongsTo(User, { foreignKey: "senderId", as: "sender" })
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" })

export default Message
