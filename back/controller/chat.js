import ChatMessages from "../models/chat.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessages.findAll({
      where: {
        conversationId: req.params.conversationId,
      },
    });
    res.json(messages);
    console.log(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllMessages = async (req, res) => {
    try {
      const messages = await ChatMessages.findAll({ where: { receiverId: req.params.receiverId } });

      res.json(messages);
      console.log(messages);
    
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal server error" });
    }
  };
  