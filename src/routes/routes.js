import { Router } from "express"
import { getAllMessages, sendMessage } from "../controllers/message.controller.js"
import { getAllUsers, getUserByUUID } from "../controllers/user.controller.js"
import { loginUser, createUser, signOutUser, refreshToken } from "../controllers/auth.controller.js"
import { tokenValidation } from "../middlewares/middleware.js"

const routes = Router({ strict: true })

// auth
routes.post("/register", createUser)
routes.post("/login", loginUser)
routes.post("/signout", signOutUser)
routes.post("/refresh_token", refreshToken)

// users
routes.get("/users", getAllUsers)
routes.get("/user/:uuid", getUserByUUID)

// messages
routes.get("/message", tokenValidation(), getAllMessages)
routes.post("/message", tokenValidation(), sendMessage)

export default routes
