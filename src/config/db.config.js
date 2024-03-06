import { Sequelize } from "sequelize"
import { config } from "dotenv"

config()

const {
  TESTING_DB_HOST,
  TESTING_DB_PORT,
  TESTING_DB_NAME,
  TESTING_DB_USER,
  TESTING_DB_PASSWORD,
  DEV_DB_HOST,
  DEV_DB_PORT,
  DEV_DB_NAME,
  DEV_DB_USER,
  DEV_DB_PASSWORD,
  PROD_DB_HOST,
  PROD_DB_PORT,
  PROD_DB_NAME,
  PROD_DB_USER,
  PROD_DB_PASSWORD,
} = process.env

const environments = {
  production: {
    name: PROD_DB_NAME,
    user: PROD_DB_USER,
    password: PROD_DB_PASSWORD,
    host: PROD_DB_HOST,
    port: PROD_DB_PORT,
  },
  testing: {
    name: TESTING_DB_NAME,
    user: TESTING_DB_USER,
    password: TESTING_DB_PASSWORD,
    host: TESTING_DB_HOST,
    port: TESTING_DB_PORT,
  },
  development: {
    name: DEV_DB_NAME,
    user: DEV_DB_USER,
    password: DEV_DB_PASSWORD,
    host: DEV_DB_HOST,
    port: DEV_DB_PORT,
  },
}

const NODE_ENV = "testing"

const selectedEnvironment = environments[NODE_ENV]

const sequelize = new Sequelize(selectedEnvironment.name, selectedEnvironment.user, selectedEnvironment.password, {
  host: selectedEnvironment.host,
  port: selectedEnvironment.port,
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
export default sequelize
