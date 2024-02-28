import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import Message from "./src/schemes/message.model.js"
import User from "./src/schemes/user.model.js"
import sequelize from "./src/config/db.config.js"
import routes from "./src/routes/routes.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.DEV_PORT
const host = process.env.DEV_HOST

const corsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.get("/", function (req, res) {
  res.send(`Hello World`)
})

app.use("/v1/api", routes)

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synced")
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error)
//   })

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port} http://${host}:${port}`)
})
