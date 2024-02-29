import express from "express"
import cors from "cors"
import { Server } from "socket.io"
import routes from "./src/routes/routes.js"
import sequelize from "./src/config/db.config.js"

const app = express()

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
  res.send(`use /v1/api`)
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

const io = new Server({ cors: "http://localhost:3002" })

io.on("connection", (socket) => {
  console.log("A user connected", socket.id)

  socket.on("clientMessage", (data) => {
    console.log("Received message from client:", data)
  })

  socket.on("message", (message) => {
    console.log("Received message:", message)
    io.emit("message", message)
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id)
  })
})

io.listen(3000)

app.listen(port, () => {
  console.log(`Server is running on port ${port} http://${host}:${port}`)
})
