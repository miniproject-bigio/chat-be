import { DataTypes } from "sequelize"
import sequelize from "../config/db.config.js"
import { v4 as uuidv4 } from "uuid"
import AccessToken from "./token.model.js"

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
})

User.hasMany(AccessToken, { foreignKey: "userId" })
AccessToken.belongsTo(User, { foreignKey: "userId" })

export default User
