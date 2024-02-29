import { DataTypes } from "sequelize"
import sequelize from "../config/db.config.js"

const RefreshToken = sequelize.define("RefreshToken", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
})

export default RefreshToken
