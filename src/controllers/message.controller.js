import Message from "../schemes/message.model.js"

export const createMessage = async (req, res) => {
  try {
    const { content } = req.body
    const newMessage = await Message.create({ content })
    res.status(201).json({ message: "Message created successfully", data: newMessage })
  } catch (error) {
    console.error("Error creating message:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ attributes: ["content"] })
    res.status(200).json(messages)
  } catch (error) {
    console.error("Error retrieving messages:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
