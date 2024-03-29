import Message from "../schemes/message.model.js"
import User from "../schemes/user.model.js"
import { verifyToken } from "../config/token.config.js"

export const getAllMessages = async (req, res) => {
  try {
    const { authorization, access_token } = req.headers

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: Bearer token required",
      })
    }

    verifyToken(access_token)

    const messages = await Message.findAll({ include: ["sender", "receiver"] })

    const formattedMessages = messages.map((message) => ({
      content: message.content,
      sender: message.sender ? message.sender.username : null,
      receiver: message.receiver ? message.receiver.username : null,
    }))

    res.status(200).json(formattedMessages)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { authorization, access_token } = req.headers
    const { content, senderId, receiverId } = req.body

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: Bearer token required",
      })
    }

    verifyToken(access_token)
    const [sender, receiver] = await Promise.all([User.findByPk(senderId), User.findByPk(receiverId)])

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" })
    }

    const newMessage = await Message.create({ content, senderId, receiverId })

    res.status(201).json({ message: "Message sent successfully", data: newMessage })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
