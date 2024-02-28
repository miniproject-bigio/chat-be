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
})

Message.belongsTo(User, { foreignKey: "senderId" })
User.hasMany(Message, { foreignKey: "senderId" })

export default Message
