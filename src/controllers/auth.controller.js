import User from "../schemes/user.model.js"
import AccessToken from "../schemes/token.model.js"
import { generateToken } from "../config/token.config.js"
import bcryptjs from "bcryptjs"

export const createUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" })
    }

    const existingUser = await User.findOne({ where: { username } })
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    const newUser = await User.create({ username, password: hashedPassword, isAdmin })
    res.status(201).json({ message: "User created successfully", data: newUser })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" })
    }

    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.status(401).json({ error: "Username does not exist in database" })
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" })
    }

    const accessToken = generateToken({ userId: user.id })
    await AccessToken.create({ token: accessToken, userId: user.id })
    res.status(200).json({ message: "Login successful", data: { user, accessToken } })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const signOutUser = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: "Invalid userId in request body" })
    }

    await AccessToken.destroy({ where: { userId: userId } })

    res.status(200).json({ message: "Sign-out successful" })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.headers

    if (!refresh_token) {
      return res.status(401).json({ error: "Refresh token not provided" })
    }

    const decoded = verifyToken(refresh_token, false)
    const user = await User.findByPk(decoded.userId)

    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" })
    }

    const newAccessToken = generateToken({ userId: user.id })
    await AccessToken.update({ token: newAccessToken }, { where: { userId: user.id } })
    res.status(200).json({ message: "Token refreshed successfully", data: { accessToken: newAccessToken } })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
