import express from "express"
import { config } from "dotenv"
import routes from "../src/routes/routes.js"

config()

const serverTest = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use("/v1/api", routes)

  return app
}

export default serverTest
