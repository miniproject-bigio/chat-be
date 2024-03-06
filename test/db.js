import { Sequelize } from "sequelize"

const databaseConfig = {
  testing: {
    name: "miniproject-chat-test",
    user: "admin",
    password: "rootinibos123",
    host: "",
    port: 5432,
  },
}

export const access_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYzAxN2U4MS0yNTU2LTQ1OWMtYmFlMy04MDJiNDRiODdjOTIiLCJpYXQiOjE3MDk3MTEzNzUsImV4cCI6MTcwOTk3MDU3NX0.LIDeB4bqqhW0si0iNfSLz1ZiJkUlLmlutXRnZu1eDLs"

export const createDatabaseConnection = () => {
  return new Sequelize(databaseConfig.testing.name, databaseConfig.testing.user, databaseConfig.testing.password, {
    host: databaseConfig.testing.host,
    port: databaseConfig.testing.port,
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  })
}
