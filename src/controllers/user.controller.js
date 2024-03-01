import User from "../schemes/user.model.js"
import { verifyToken } from "../config/token.config.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    const formattedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    }))

    res.status(200).json({ data: formattedUsers })
  } catch (error) {
    console.error("Error retrieving users:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getUserByUUID = async (req, res) => {
  try {
    const { uuid } = req.params

    const user = await User.findOne({
      where: {
        id: uuid,
      },
      attributes: ["id", "username", "isAdmin"],
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Error retrieving user by UUID:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
