import Message from "../schemes/message.model.js"
import User from "../schemes/user.model.js"

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ include: ["sender", "receiver"] })

    const formattedMessages = messages.map((message) => ({
      content: message.content,
      sender: message.sender ? message.sender.username : null,
      receiver: message.receiver ? message.receiver.username : null,
    }))

    res.status(200).json(formattedMessages)
  } catch (error) {
    console.error("Error retrieving messages:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { content, senderId, receiverId } = req.body

    const [sender, receiver] = await Promise.all([User.findByPk(senderId), User.findByPk(receiverId)])

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" })
    }

    const newMessage = await Message.create({ content, senderId, receiverId })

    res.status(201).json({ message: "Message sent successfully", data: newMessage })
  } catch (error) {
    console.error("Error sending message:", error)

    console.error("Request Body:", req.body)
    console.error("Error Stack Trace:", error.stack)

    res.status(500).json({ error: "Internal server error" })
  }
}
