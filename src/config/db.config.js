import { Sequelize } from "sequelize"
import { config } from "dotenv"

config()

const { DEV_DB_HOST, DEV_DB_PORT, DEV_DB_NAME, DEV_DB_USER, DEV_DB_PASSWORD, PROD_DB_HOST, PROD_DB_PORT, PROD_DB_NAME, PROD_DB_USER, PROD_DB_PASSWORD } = process.env

const databaseConfig = {
  development: {
    name: DEV_DB_NAME,
    user: DEV_DB_USER,
    password: DEV_DB_PASSWORD,
    host: DEV_DB_HOST,
    port: DEV_DB_PORT,
  },
  production: {
    name: PROD_DB_NAME,
    user: PROD_DB_USER,
    password: PROD_DB_PASSWORD,
    host: PROD_DB_HOST,
    port: PROD_DB_PORT,
  },
}

console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("Selected config:", databaseConfig[process.env.NODE_ENV])

const sequelize = new Sequelize(databaseConfig[process.env.NODE_ENV].name, databaseConfig[process.env.NODE_ENV].user, databaseConfig[process.env.NODE_ENV].password, {
  host: databaseConfig[process.env.NODE_ENV].host,
  port: databaseConfig[process.env.NODE_ENV].port,
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

export default sequelize
