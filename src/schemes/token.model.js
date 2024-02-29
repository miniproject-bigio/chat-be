import { DataTypes } from "sequelize"
import sequelize from "../config/db.config.js"

const AccessToken = sequelize.define("AccessToken", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
})

export default AccessToken
