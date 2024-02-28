import { Sequelize } from "sequelize"
import { config } from "dotenv"

config()

const { DEV_DB_HOST, DEV_DB_PORT, DEV_DB_NAME, DEV_DB_USER, DEV_DB_PASSWORD } = process.env

const sequelize = new Sequelize(DEV_DB_NAME, DEV_DB_USER, DEV_DB_PASSWORD, {
  host: DEV_DB_HOST,
  port: DEV_DB_PORT,
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

export default sequelize
