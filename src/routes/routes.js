import { Router } from "express"
import { getAllMessages, createMessage } from "../controllers/message.controller.js"
import { getAllUsers, createUser } from "../controllers/user.controller.js"

const routes = Router({ strict: true })

// users
routes.get("/users", getAllUsers)
routes.post("/user", createUser)

// messages
routes.get("/message", getAllMessages)
routes.post("/message", createMessage)

export default routes
