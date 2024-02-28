import User from "../schemes/user.model.js"

export const createUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body
    const newUser = await User.create({ username, password, isAdmin })
    res.status(201).json({ message: "User created successfully", data: newUser })
  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    console.error("Error retrieving users:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
